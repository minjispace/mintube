import {StatusCodes} from 'http-status-codes';
import {BadRequestError, UnauthorizedError} from '../errors/index.js';
import {createUserByEmailAndPassword, findUserByEmail, updateUserToDatabase, comparePassword} from '../services/user.services.js';
import {createVerificationToken, hashToken, createTokenUser, attachCookiesToResponse} from '../utils/index.js';
import {addTokenToDatabase, findTokenByIdFromDatabase, deleteTokenFromDatabase} from '../services/token.services.js';
import db from '../db/connect.js';
// -----------------------------------------------

//  ✅ create user controller
const registerUser = async (req, res) => {
  const {email, name, password} = req.body;

  // name이나 email이나 password field가 하나라도 충족되지 않을떄
  if (!email || !name || !password) {
    throw new BadRequestError('please provide all values');
  }

  // 이미 존재하는 email 일 때
  const userAlreadyExists = await findUserByEmail(email);
  if (userAlreadyExists) {
    throw new BadRequestError('Email is already in use. please write another email.');
  }

  //  create token
  const verificationToken = hashToken(createVerificationToken());

  //  email,password,name을 보내서 새로운 유저 등록
  const user = await createUserByEmailAndPassword({email, password, name, verificationToken, passwordToken: ''});

  // res 요청
  return res.status(StatusCodes.CREATED).json({
    user,
  });
};
// ------------------------------------------------
//  ✅ login user controller
const loginUser = async (req, res) => {
  const {email, password} = req.body;

  // email이나 password field가 하나라도 충족되지 않을떄
  if (!email || !password) {
    throw new BadRequestError('please provide all values');
  }

  //  내 user database에서 존재하는 User 찾기
  const existingUser = await findUserByEmail(email);

  // 현존하는 이메일이 아닐 경우
  if (!existingUser) {
    throw new BadRequestError('Invalid user email credentials');
  }

  // 해당 password가 아닐 경우
  const isMatch = comparePassword(password, existingUser.password);

  //  비밀번호가 match하지 않을 때
  if (!isMatch) {
    throw new BadRequestError('Invalid user password credentials');
  }

  //  위에 조건 에러들 다 쳐내고, 성공한다면 user정보를 담은 tokenUser 생성해서 정의 먼저해주기
  const tokenUser = createTokenUser(existingUser);

  //  create refresh token
  let refreshToken = '';
  refreshToken = hashToken(createVerificationToken());

  //  token database에서 나의 해당 user로 existingToken 찾기
  const existingToken = await findTokenByIdFromDatabase(existingUser.id);

  //  이미 토큰이 있을 경우
  if (existingToken) {
    // 토큰이 가진 아이가 isValid가 false일 경우
    if (!existingToken.isValid) {
      throw new BadRequestError('Invalid Credentials. Please check this user isValid or not');
    }

    //isValid가 true긴 하지만 token이 존재하므로, 다시 우리의 cookie에 붙여주자
    refreshToken = existingToken.refreshToken;
    attachCookiesToResponse({res, user: tokenUser, refreshToken});
    res.status(StatusCodes.OK).json({user: tokenUser});
    return;
  }

  //  만들어진 토큰이 없을 경우 새로 만들어주기
  //  token fields에 충족하는 값들 정의
  const userAgent = req.headers['user-agent'];
  const ip = req.ip;
  const userToken = {refreshToken, ip, userAgent, userId: existingUser.id};

  //  token database에 새로 만들어주기
  await addTokenToDatabase(userToken);

  //  cookie 생성
  attachCookiesToResponse({res, user: tokenUser, refreshToken});

  // res 요청
  return res.status(StatusCodes.OK).json({user: tokenUser});
};

// ------------------------------------------------
// ✅ logout user  controller
const logoutUser = async (req, res) => {
  const user = req.user;

  await deleteTokenFromDatabase(user.id);

  //  access token
  res.cookie('accessToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  //  refresh  token
  res.cookie('refreshToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({msg: 'user logged out!'});
};

//  ✅ update user name controller
const updateUserName = async (req, res) => {
  const {name} = req.body;

  //  fields중에 하나라도 충족 되지 않았을때
  if (!name) {
    throw new BadRequestError('please provide new name');
  }

  //  update new name
  const updatedUser = await updateUserToDatabase(req.user.email, name);

  // create new tokenUser
  const tokenUser = createTokenUser(updatedUser);

  //  token database에서 나의 해당 user로 existingToken 찾기
  const {refreshToken} = await findTokenByIdFromDatabase(updatedUser.id);

  // attachCookiesToResponse
  attachCookiesToResponse({res, user: tokenUser, refreshToken});

  res.status(StatusCodes.OK).json({user: tokenUser});
};

// ------------------------------------------------
// ✅ ready for update user password controller
const readyUpdateUserPassword = async (req, res) => {
  const {originalPassword} = req.body;
  console.log(originalPassword, 'original password');
  //  fields에서 하나라도 충족되지 않았을 때
  if (!originalPassword) {
    throw new BadRequestError('please provide original your password');
  }

  // database에서 나의 user찾기
  const currentUser = await findUserByEmail(req.user.email);

  //  원래 비밀번호와 oldPassword에 쓴 값이 맞는지 비교
  const isPasswordCorrect = comparePassword(currentUser.password, originalPassword);

  //  원래 비밀번호와 일치하지 않을때
  if (!isPasswordCorrect) {
    throw new UnauthorizedError('Not matched original password');
  }

  //  password token 생성
  const passwordToken = hashToken(createVerificationToken());

  //  password token update
  await db.user.update({
    where: {
      id: req.user.id,
    },
    data: {
      passwordToken,
    },
  });

  //  res 요청
  return res.status(StatusCodes.OK).json({msg: 'ready for reset paassword', passwordToken});
};

// ------------------------------------------------
//  ✅ update user password
const updateUserPassword = async (req, res) => {
  const {passwordToken, newPassword, email} = req.body;

  //  fields가 하나라도 충족되지 않을때
  if (!passwordToken || !newPassword || !email) {
    throw new BadRequestError('please provide all values');
  }

  //  해당 email이 나의 user database에 있는지 확인
  const user = await findUserByEmail(email);
  if (!user) {
    throw new BadRequestError('not matched your email.');
  }

  //  passwordToken이 맞지 않을때
  if (user.passwordToken !== passwordToken) {
    throw new BadRequestError('not matched your passwordToken.');
  }

  //  조건이 다 맞으니 update 시켜주기
  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: newPassword,
      passwordToken: '',
    },
  });

  res.status(StatusCodes.OK).json({msg: 'success reset password'});
};

// ------------------------------------------------
//  ✅ delete user  controller
const deleteUser = async (req, res) => {
  res.json('delte user');
};

// ------------------------------------------------
// ✅  get user all videos
const getUserVideos = async (req, res) => {
  res.json('get user all videosr');
};

// ------------------------------------------------
// ✅  get user all comments
const getUserComments = async (req, res) => {
  res.json('get user all comments');
};

// ------------------------------------------------
export {registerUser, loginUser, updateUserName, readyUpdateUserPassword, deleteUser, logoutUser, getUserComments, getUserVideos, updateUserPassword};
