import {StatusCodes} from 'http-status-codes';
import {BadRequestError} from '../errors/index.js';
import {createUserByEmailAndPassword, findUserByEmail} from '../services/user.services.js';
import {createVerificationToken, hashToken, createTokenUser, attachCookiesToResponse} from '../utils/index.js';
import bcrypt from 'bcrypt';
import {addTokenToDatabase, findTokenByIdFromDatabase} from '../services/token.services.js';

// -----------------------------------------------

//  1. create user controller
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
  const user = await createUserByEmailAndPassword({email, password, name, verificationToken});

  // res 요청
  return res.status(StatusCodes.CREATED).json({
    user,
  });
};

//  2.login user controller
const loginUser = async (req, res) => {
  const {email, password} = req.body;

  // email이나 password field가 하나라도 충족되지 않을떄
  if (!email || !password) {
    throw new BadRequestError('please provide all values');
  }

  const existingUser = await findUserByEmail(email);

  // 현존하는 이메일이 아닐 경우
  if (!existingUser) {
    throw new BadRequestError('Invalid user email credentials');
  }

  // 해당 password가 아닐 경우
  const validPassword = await bcrypt.compare(password, existingUser.password);
  if (!validPassword) {
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
    res.status(StatusCodes.OK).json({user: tokenUser, refreshToken});
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
  return res.status(StatusCodes.OK).json({user: tokenUser, refreshToken});
};

//  3. update user controller
const updateUser = async (req, res) => {
  res.json('update user');
};

//  4. delete user  controller
const deleteUser = async (req, res) => {
  res.json('delte user');
};

//  5. logout user  controller
const logoutUser = async (req, res) => {
  res.json('logout User ');
};

//  6.get user all videos
const getUserVideos = async (req, res) => {
  res.json('get user all videosr');
};

// 7.get user all comments
const getUserComments = async (req, res) => {
  res.json('get user all comments');
};

// 8. refresh token
const refreshToken = async (req, res) => {
  console.log(refreshToken, '@@refresh token');
  res.json({msg: 'refresh token created'});
};

export {registerUser, loginUser, updateUser, deleteUser, logoutUser, getUserComments, getUserVideos, refreshToken};
