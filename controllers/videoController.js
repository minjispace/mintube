import {StatusCodes} from 'http-status-codes';
import {BadRequestError, NotFoundError} from '../errors/index.js';
import {countComments} from '../services/comment.services.js';
import {findUserByEmail} from '../services/user.services.js';
import {createVideoToDatabase, deleteVideoById, findAllVideo, findSingleVideoById, updateVideoById} from '../services/video.services.js';

// -------------------------------------------------------

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

  //  field 하나라도 충족이 되지 않을 때
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
  res.status(StatusCodes.CREATED).json({video});
};

// ✅  update video
const updateVideo = async (req, res) => {
  const {id} = req.params;
  const {title, description} = req.body;

  //  fields중 하나라도 충족이 되지 않을때
  if (!title || !description) {
    throw new BadRequestError('please provide all values');
  }

  //  id 검사하고 하는일은 authorizePermissionOwner 미들웨어해서 해줌

  //  update video
  const updatedVideo = await updateVideoById(id, {title, description});

  // res 요청
  res.status(StatusCodes.OK).json({video: updatedVideo});
};

//  ✅ delete video
const deleteVideo = async (req, res) => {
  const {id} = req.params;

  //  id 검사하고 하는일은 authorizePermissionOwner 미들웨어해서 해줌

  //  delete video
  await deleteVideoById(id);

  //  res 요청
  res.status(StatusCodes.OK).json({msg: 'Success! Video removed'});
};

//  ✅ get all videos
const getAllVideos = async (req, res) => {
  const videos = await findAllVideo(req.user);

  //  videos의 총 수
  const videoCount = videos.length;

  //  video가 없을 경우
  if (videoCount === 0) {
    throw new NotFoundError('no videos');
  }

  // res 요청
  res.status(StatusCodes.OK).json({videos, videoCount: videoCount});
};

//  ✅ get single video
const getSingleVideo = async (req, res) => {
  const {id} = req.params;

  //  이 video에 달린 commnets 총 수
  const commentCount = await countComments();

  //  해당 친 id로 우리의 video 정보가 존재하지 않을 때
  const existingVideo = await findSingleVideoById(id);
  if (!existingVideo) {
    throw new NotFoundError(`No Video with id ${id}`);
  }

  //  res 요청
  res.status(StatusCodes.OK).json({video: existingVideo, commentCount});
};

export {createVideo, updateVideo, deleteVideo, getAllVideos, getSingleVideo};
