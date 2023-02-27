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

// compare original password and written password
const comparePassword = async (userPassword, writtenPassword) => {
  return await bcrypt.compare(writtenPassword, userPassword);
};

//  update user to database
const updateUserToDatabase = (email, content) => {
  return db.user.update({
    where: {
      email,
    },
    data: {
      name: content,
    },
  });
};

export {getFirstUser, findUserByEmail, createUserByEmailAndPassword, updateUserToDatabase, comparePassword};
