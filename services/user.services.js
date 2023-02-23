import db from '../db/connect.js';
import bcrypt from 'bcrypt';
// -----------------------------------------------

const getFirstUser = () => {
  return db.user.findFirst({
    orderBy: {
      createdAt: 'asc',
    },
  });
};

function findUserByEmail(email) {
  return db.user.findUnique({
    where: {
      email,
    },
  });
}

async function createUserByEmailAndPassword(user) {
  user.password = bcrypt.hashSync(user.password, 10);
  user.role = (await getFirstUser()) ? 'USER' : 'ADMIN';

  return db.user.create({
    data: user,
  });
}

function findUserById(id) {
  return db.user.findUnique({
    where: {
      id,
    },
  });
}

export {getFirstUser, findUserByEmail, createUserByEmailAndPassword, findUserById};
