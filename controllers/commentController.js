import {StatusCodes} from 'http-status-codes';

//  ✅create comment
const createComment = async (req, res) => {
  res.json({msg: 'create comment'});
  // res.status(StatusCodes.CREATED).json({msg:'create comment'})
};

//  ✅ update comment
const updateComment = async (req, res) => {
  res.json({msg: 'update comment'});
  // res.status(StatusCodes.CREATED).json({msg:'create comment'})
};

//  ✅ delete comment
const deleteComment = async (req, res) => {
  res.json({msg: 'delete comment'});
  // res.status(StatusCodes.CREATED).json({msg:'create comment'})
};

//  ✅ get all comments
const getAllComments = async (req, res) => {
  res.json({msg: 'get all comment'});
  // res.status(StatusCodes.CREATED).json({msg:'create comment'})
};

export {createComment, deleteComment, updateComment, getAllComments};
