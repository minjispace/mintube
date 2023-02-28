import db from '../db/connect.js';
import {BadRequestError} from '../errors/index.js';
// ----------------------------------------------------

//  create video
const createVideoToDatabase = (data) => {
  try {
    return db.video.create({
      data,
    });
  } catch (error) {
    console.log(error);
    throw new BadRequestError('falied to create video');
  }
};

const findAllVideo = () => {
  return db.video.findMany();
};

const findSingleVideoById = (id) => {
  console.log(id, 'id');
  return db.video.findUnique({
    where: {
      id,
    },
  });
};

export {createVideoToDatabase, findAllVideo, findSingleVideoById};
