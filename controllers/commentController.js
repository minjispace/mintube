import {StatusCodes} from 'http-status-codes';
import {BadRequestError, NotFoundError} from '../errors/index.js';
import {createCommentToDatabase, deleteCommentFromDatabase, findAllCommentsFromDatabase, findAlreadySubmittedUser, findCommentById, updateCommentFromDatabase} from '../services/comment.services.js';
import {findSingleVideoById} from '../services/video.services.js';
import {authorizePermissionForOnlyOwner} from '../utils/ownerCheck.js';

//  ✅create comment
const createComment = async (req, res) => {
  const {message, videoId} = req.body;

  //  field가 채워지지 않은 경우
  if (!message || !videoId) {
    throw new BadRequestError('please provide message for this comment');
  }

  // comment 달을 해당 video 존재하는지 찾기
  const existingVideo = await findSingleVideoById(videoId);

  //  해당 video가 존재하지 않을 때
  if (!existingVideo) {
    throw new NotFoundError(`No Video with id ${videoId}`);
  }

  // 이미 해당 유저가 해당 video에 댓글을 남겼을 경우를 찾기위해 comment model에서 찾기
  const alreadySubmittedUser = await findAlreadySubmittedUser(req.user.id, existingVideo.id);

  //  이미 comment를 등록한 유저일 경우 에러
  if (alreadySubmittedUser) {
    throw new BadRequestError('Already submitted comment for this video.');
  }

  // create comment
  const comment = await createCommentToDatabase({message, userId: req.user.id, videoId});

  //  res 요청
  res.status(StatusCodes.CREATED).json({comment});
};

//  ✅ update comment
const updateComment = async (req, res) => {
  const {id} = req.params;
  const {message} = req.body;

  //  message field를 쓰지 않았을 때
  if (!message) {
    throw new BadRequestError('please provide message comment for this video');
  }

  //  해당 comment 나의 db에서 찾기
  const existingComment = await findCommentById(id);

  //  만약 존재하지 않는다면 에러
  if (!existingComment) {
    throw new NotFoundError(`No Comment with id ${id}`);
  }

  //  작성한 유저가 맞는지 확인 owner check
  await authorizePermissionForOnlyOwner(req.user.id, existingComment.userId);

  //  update comment
  const comment = await updateCommentFromDatabase(id, message);

  //  존재하면 res 요청 보내기
  res.status(StatusCodes.OK).json({comment});
};

//  ✅ delete comment
const deleteComment = async (req, res) => {
  const {id} = req.params;

  //  해당 comment 나의 db에서 찾기
  const existingComment = await findCommentById(id);

  //  만약 존재하지 않는다면 에러
  if (!existingComment) {
    throw new NotFoundError(`No Comment with id ${id}`);
  }

  //  owner check
  await authorizePermissionForOnlyOwner(req.user.id, existingComment.userId);

  //  delete comment
  await deleteCommentFromDatabase(id);

  res.status(StatusCodes.OK).json({msg: 'success! deleted comment'});
};

//  ✅ get all comments
const getAllComments = async (req, res) => {
  const comments = await findAllCommentsFromDatabase(req.user);
  res.status(StatusCodes.CREATED).json({comments});
};

export {createComment, deleteComment, updateComment, getAllComments};
