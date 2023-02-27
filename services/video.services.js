import db from '../db/connect.js';
import {BadRequestError} from '../errors/index.js';
// ----------------------------------------------------

//  create video
const createVideoToDatabase = (data) => {
  console.log(data, 'data');
  try {
    return db.video.create({
      data,
    });
  } catch (error) {
    console.log(error);
    throw new BadRequestError('falied to create video');
  }
};

export {createVideoToDatabase};
