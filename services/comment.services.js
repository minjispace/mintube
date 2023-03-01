import db from '../db/connect.js';
import {commentRequiredInfo, videoRequiredInfo} from '../utils/prismaSelect.js';

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
  return db.comment.findMany({
    select: commentRequiredInfo.select,
  });
};

//  find by id comment
const findCommentById = (id) => {
  return db.comment.findFirst({
    where: {id},
    select: commentRequiredInfo.select,
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

//  count comments
const countComments = () => {
  return db.comment.count();
};

// group by video id
const groubByVideoId = () => {
  return db.comment.groupBy({
    by: ['videoId'],
    _count: {
      _all: true,
    },
  });
};
//  export functions
export {createCommentToDatabase, findAlreadySubmittedUser, findAllCommentsFromDatabase, updateCommentFromDatabase, deleteCommentFromDatabase, findCommentById, countComments, groubByVideoId};
