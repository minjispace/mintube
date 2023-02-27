import {BadRequestError, UnauthenticatedError} from '../errors/index.js';
import {findUserByEmail} from '../services/user.services.js';
import {createVideoToDatabase} from '../services/video.services.js';

//  create video
const createVideo = async (req, res) => {
  console.log(req.user, '@@what is user');
  const {file} = req;
  const {title, description} = req.body;

  //  file이 존재하지 않을때
  if (!file) {
    throw new BadRequestError('no file uploaded');
  }

  //  field 하나라도 충족이 되지 않을때
  if (!title || !description) {
    throw new BadRequestError('please provide all values');
  }

  //  만약 해당 유저가 권한이 없을때를 위해 존재하는 유저 찾기
  const existingUser = await findUserByEmail(req.user.email);

  if (!existingUser) {
    throw new BadRequestError('Invalid user email credentials');
  }

  //  create database video
  const video = await createVideoToDatabase({title, description, fileUrl: file.path, userId: existingUser.id});

  //  res 요청
  res.json({video});
};

// update video
const updateVideo = async (req, res) => {
  res.json({msg: 'update video'});
};

//  delete video
const deleteVideo = async (req, res) => {
  res.json({msg: 'delete video'});
};

//  get all videos
const getAllVideos = async (req, res) => {
  res.json({msg: 'get all videos'});
};

//  get single video
const getSingleVideo = async (req, res) => {
  res.json({msg: 'get single video'});
};

export {createVideo, updateVideo, deleteVideo, getAllVideos, getSingleVideo};
