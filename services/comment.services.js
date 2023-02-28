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
const findAllCommentsFromDatabase = () => {
  return db.comment.findMany({});
};

//  find by id comment
const findCommentById = (id) => {
  return db.comment.findFirst({
    where: {id},
  });
};

//  update comment
const updateCommentFromDatabase = (id, message) => {
  return db.comment.update({
    where: {
      id: id.toString(),
    },
    data: {
      message,
    },
  });
};

const deleteCommentFromDatabase = (id) => {
  return db.comment.delete({
    where: {id},
  });
};

//  export functions
export {createCommentToDatabase, findAlreadySubmittedUser, findAllCommentsFromDatabase, updateCommentFromDatabase, deleteCommentFromDatabase, findCommentById};
