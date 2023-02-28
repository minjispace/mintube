import db from '../db/connect.js';
// ----------------------------------------------

//  create comment
const createCommentToDatabase = (data) => {
  console.log(data, 'data');
  try {
    return db.comment.create({
      data,
    });
  } catch (error) {
    console.log(error);
    throw new BadRequestError('falied to create video');
  }
};

// find comment
const findAlreadySubmittedUser = (userId, videoId) => {
  return db.comment.findFirst({
    where: {
      userId,
      videoId,
    },
  });
};

// get all comments
const findAllCommentsFromDatabase = (user) => {
  return db.comment.findMany({});
};

//  update comment
const updateCommentFromDatabase = (id, message) => {
  console.log(id, message, '@@ what is this');
  return db.comment.update({
    where: {
      id: id.toString(),
    },
    data: {
      message,
    },
  });
};

const deleteCommentFromDatabase = () => {
  return db.comment.delete({
    where: {id},
  });
};

//  export functions
export {createCommentToDatabase, findAlreadySubmittedUser, findAllCommentsFromDatabase, updateCommentFromDatabase, deleteCommentFromDatabase};
