import db from '../db/connect.js';
// ----------------------------------------------------

// used when we create a refresh token.
function addTokenToDatabase({refreshToken, ip, userAgent, userId}) {
  return db.token.create({
    data: {
      refreshToken,
      ip,
      userAgent,
      userId,
    },
  });
}

// used to check if the token sent by the client is in the database.
function findTokenByIdFromDatabase(userId) {
  return db.token.findUniqueOrThrow({
    where: {userId},
  });
}

export {addTokenToDatabase, findTokenByIdFromDatabase};
