import {StatusCodes} from 'http-status-codes';
import {BadRequestError, NotFoundError} from '../errors/index.js';
import {findUserByEmail} from '../services/user.services.js';
import {createVideoToDatabase, deleteVideoById, findAllVideo, findSingleVideoById, updateVideoById} from '../services/video.services.js';

//  ✅ create video
const createVideo = async (req, res) => {
  const {file} = req;
  const {title, description} = req.body;

  //  file이 존재하지 않을때
  if (!file) {
    throw new BadRequestError('no file uploaded');
  }

  //  파일형식이 비디오 형식이 아닐때
  if (!file.mimetype.startsWith('video')) {
    throw new BadRequestError('please upload video file.');
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
  const video = await createVideoToDatabase({title, description, fileUrl: file.location, userId: existingUser.id});

  //  res 요청
  res.json({video});
};

// ✅  update video
const updateVideo = async (req, res) => {
  const {id} = req.params;
  const {title, description} = req.body;

  //  fields중 하나라도 충족이 되지않을때
  if (!title || !description) {
    throw new BadRequestError('please provide all values');
  }

  //  해당 video가 없을때
  const updatedVideo = await updateVideoById(id, {title, description});
  if (!updatedVideo) {
    throw new NotFoundError(`No video with id ${id}`);
  }

  // res 요청
  res.status(StatusCodes.OK).json({video: updatedVideo});
};

//  ✅ delete video
const deleteVideo = async (req, res) => {
  const {id} = req.params;

  const video = await findSingleVideoById(id);
  //  해당 id로 video를 찾을 수 없을때
  if (!video) {
    throw new NotFoundError(`No product with id ${id}`);
  }

  await deleteVideoById(id);
  //  res 요청
  res.status(StatusCodes.OK).json({msg: 'Success! Video removed'});
};

//  ✅ get all videos
const getAllVideos = async (req, res) => {
  const videos = await findAllVideo();
  const videoCount = videos.length;

  //  video가 없을경우
  if (videoCount === 0) {
    throw new NotFoundError('no videos');
  }
  res.status(StatusCodes.OK).json({videos, count: videoCount});
};

//  ✅ get single video
const getSingleVideo = async (req, res) => {
  const {id} = req.params;

  //  해당 친 id로 우리의 video 정보가 존재하지않을때
  const singleVideo = await findSingleVideoById(id);
  if (!singleVideo) {
    throw new NotFoundError(`No Video with id ${id}`);
  }

  //  res 요청
  res.status(StatusCodes.OK).json({video: singleVideo});
};

export {createVideo, updateVideo, deleteVideo, getAllVideos, getSingleVideo};
