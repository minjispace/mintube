import {StatusCodes} from 'http-status-codes';
import {BadRequestError} from '../errors/index.js';
import {createUserByEmailAndPassword, findUserByEmail} from '../services/user.services.js';
import {v4 as uuidv4} from 'uuid';
import {generateTokens} from '../utils/jwt.js';
import {addRefreshTokenToWhitelist} from '../services/auth.services.js';
import {PrismaClient} from '@prisma/client';

// -----------------------------------------------

//  create user controller
const registerUser = async (req, res) => {
  const {email, name, password} = req.body;
  //   const prisma = new PrismaClient();
  // name이나 email이나 password field가 하나라도 충족되지 않을떄
  if (!email || !name || !password) {
    throw new BadRequestError('please provide all values');
  }

  // 이미 존재하는 email 일 때
  const userAlreadyExists = await findUserByEmail(email);
  if (userAlreadyExists) {
    throw new BadRequestError('Email is already in use. please write another email.');
  }

  const user = await createUserByEmailAndPassword({email, password, name});
  const jti = uuidv4();
  console.log({user, jti}, '@@@@@@@@@');
  const {accessToken, refreshToken} = generateTokens(user, jti);
  await addRefreshTokenToWhitelist({jti, refreshToken, userId: user.id});

  //   // hash password 생성
  //   const makeHashPassword = async (currentPassword) => {
  //     let password = currentPassword.toString();
  //     const salt = bcrypt.genSalt(10);
  //     return await bcrypt.hash(password, parseInt(salt));
  //   };

  //   // hash된 password
  //   const hashedPassword = await makeHashPassword(password);

  //   // newUser 만들기
  //   const newUser = await prisma.user.create({
  //     data: {
  //       email,
  //       name,
  //       password,
  //     },
  //     select: {
  //       email: true,
  //       name: true,
  //       password: true,
  //       role: true,
  //     },
  //   });
  //   console.log(newUser, '@@@@@@@');

  // jwt token
  //   const tokenUser = {name, email, password, role: newUser.role};
  //   console.log(tokenUser);

  // res 요청
  return res.status(StatusCodes.CREATED).json({
    accessToken,
    refreshToken,
  });
};

//  login user controller
const loginUser = async (req, res) => {
  res.json('login user');
};

//  update user controller
const updateUser = async (req, res) => {
  res.json('update user');
};

//  delete user  controller
const deleteUser = async (req, res) => {
  res.json('delte user');
};

//  logout user  controller
const logoutUser = async (req, res) => {
  res.json('logout User ');
};

//  get user all videos
const getUserVideos = async (req, res) => {
  res.json('get user all videosr');
};

//  get user all comments
const getUserComments = async (req, res) => {
  res.json('get user all comments');
};

export {registerUser, loginUser, updateUser, deleteUser, logoutUser, getUserComments, getUserVideos};
