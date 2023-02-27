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
  //  role 정해주기
  user.role = (await db.user.count()) === 0 ? 'ADMIN' : 'USER';

  //  user create
  return db.user.create({
    data: user,
  });
}

//  bcrypt password hash
const hashBcryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// compare original password and written password
const comparePasswordWithBcrypt = async (writtenPassword, originalpassword) => {
  return await bcrypt.compare(writtenPassword, originalpassword);
};

//  update user to database
const updateUserToDatabase = (id, type, data) => {
  let result;
  //  name
  if (type === 'name') {
    result = db.user.update({
      where: {
        id,
      },
      data: {
        name: data,
      },
    });
  }

  //  passwordToken
  if (type === 'passwordToken') {
    result = db.user.update({
      where: {
        id,
      },
      data: {
        passwordToken: data,
      },
    });
  }

  // password
  if (type === 'password') {
    result = db.user.update({
      where: {
        id,
      },
      data: {
        password: data,
        passwordToken: '',
      },
    });
  }
  return result;
};

export {getFirstUser, findUserByEmail, createUserByEmailAndPassword, updateUserToDatabase, comparePasswordWithBcrypt, hashBcryptPassword};
