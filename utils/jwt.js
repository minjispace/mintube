import jwt from 'jsonwebtoken';
// ----------------------------------------------

//  1. create JWT
const createJWT = ({payload}) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

//  2. is token valid check
const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET);

//  3. attach cookies to reaponse
const attachCookiesToResponse = ({res, user, refreshToken}) => {
  //  token 생성
  const accessTokenJWT = createJWT({payload: {user}});
  const refreshTokenJWT = createJWT({payload: {user, refreshToken}});

  //  날짜 설정
  const oneDay = 1000 * 60 * 60 * 24;
  const longerExp = 1000 * 60 * 60 * 24 * 30;

  //  access token cookie로 보내주기
  res.cookie('accessToken', accessTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    expires: new Date(Date.now() + oneDay),
  });

  //  refresh token cookie로 보내주기
  res.cookie('refreshToken', refreshTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    expires: new Date(Date.now() + longerExp),
  });
};

export {createJWT, isTokenValid, attachCookiesToResponse};
