import db from '../db/connect.js';
import {BadRequestError} from '../errors/index.js';
import {videoRequiredInfo} from '../utils/prismaSelect.js';
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

//  get all videos
const findAllVideo = () => {
  return db.video.findMany({
    select: videoRequiredInfo.select,
  });
};

//  get single video
const findSingleVideoById = (id) => {
  return db.video.findUnique({
    where: {
      id: id.toString(),
    },
    select: videoRequiredInfo.select,
  });
};

// update video
const updateVideoById = (id, data) => {
  const {title, description} = data;
  return db.video.update({
    where: {
      id: id.toString(),
    },
    data: {
      title,
      description,
    },
  });
};

// delete video
const deleteVideoById = (id) => {
  return db.video.delete({
    where: {
      id: id.toString(),
    },
  });
};

export {createVideoToDatabase, findAllVideo, findSingleVideoById, updateVideoById, deleteVideoById};
