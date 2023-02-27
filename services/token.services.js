import db from '../db/connect.js';
// ----------------------------------------------------

// used when we create a refresh token.
const addTokenToDatabase = ({refreshToken, ip, userAgent, userId}) => {
  return db.token.create({
    data: {
      refreshToken,
      ip,
      userAgent,
      userId,
    },
  });
};

// used to check if the token sent by the client is in the database.
const findTokenByIdFromDatabase = (userId, refreshToken) => {
  if (!refreshToken) {
    return db.token.findUnique({
      where: {userId},
    });
  }

  return db.token.findFirst({
    where: {userId, refreshToken},
  });
};

//  used to delete if the user is logged out
const deleteTokenFromDatabase = (userId) => {
  return db.token.delete({
    where: {userId},
  });
};

export {addTokenToDatabase, findTokenByIdFromDatabase, deleteTokenFromDatabase};
