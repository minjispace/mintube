import {NotFoundError, UnauthenticatedError, UnauthorizedError} from '../errors/index.js';
import {findCommentById} from '../services/comment.services.js';
import {findTokenByIdFromDatabase} from '../services/token.services.js';
import {findSingleVideoById} from '../services/video.services.js';
import {attachCookiesToResponse, isTokenValid} from '../utils/index.js';

// authenticateUser middleware
const authenticateUser = async (req, res, next) => {
  const {accessToken, refreshToken} = req.signedCookies;

  try {
    //  1. access token에 문제가 있어서, refresh token으로 와서 확인
    if (!accessToken) {
      //  jwt로 refresh token이 valid 한지 확인
      const payload = isTokenValid(refreshToken);

      //  refreshtoken 있는지 확인
      const existingRefreshToken = await findTokenByIdFromDatabase(payload.user.id, payload.refreshToken.refreshToken);

      //  refresh token이 존재하지않거나 isValid가 false인 경우
      if (!existingRefreshToken || !existingRefreshToken?.isValid) {
        throw new UnauthenticatedError('Authentication Invalid');
      }

      //  cookie에 확인한 우리의 existing token과 user 다시 붙여주기
      attachCookiesToResponse({res, user: payload.user, refreshToken: existingRefreshToken});
      req.user = payload.user;
      return next();
    }

    // 2. access token이 존재하고, valid한지 확인
    //  jwt로 access token이 valid 한지 확인
    const payload = isTokenValid(accessToken);

    //  우리의 req.user에 user 정보 담아주기
    req.user = payload.user;
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication Invalid. please login again');
  }
};

//  authorizePermissionsForOnlyAdmin
const authorizePermissionsForOnlyAdmin = (role) => {
  return (req, res, next) => {
    //  만약 Role이 ADMIN계정이 아니라면 빠꾸
    if (!role.match(req.user.role)) {
      throw new UnauthorizedError('Unauthorized to access this user. please login admin user');
    }
    next();
  };
};

//  owner check middleware
const authorizePermissionOwner = (type) => {
  return async (req, res, next) => {
    let result;
    let {id: providedId} = req.params;
    let {id: userId} = req.user;

    //  video일 경우
    if (type === 'video') {
      result = await findSingleVideoById(providedId);
    }

    //  comment일 경우
    if (type === 'comment') {
      result = await findCommentById(providedId);
    }

    //  existing result가 없을경우
    if (!result) {
      throw new NotFoundError(`No video with id ${providedId}`);
    }

    //  owner check
    if (userId !== result.userId) {
      throw new UnauthorizedError('Unauthorized to access this user.');
    }
    next();
  };
};

export {authenticateUser, authorizePermissionsForOnlyAdmin, authorizePermissionOwner};
