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
  return db.video.findUnique({
    where: {
      id,
    },
  });
};

const updateVideoById = (id, data) => {
  const {title, description} = data;
  return db.video.update({
    where: {id},
    data: {
      title,
      description,
    },
  });
};

const deleteVideoById = (id) => {
  return db.video.delete({
    where: {id},
  });
};

export {createVideoToDatabase, findAllVideo, findSingleVideoById, updateVideoById, deleteVideoById};
