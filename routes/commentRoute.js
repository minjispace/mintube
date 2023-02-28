import express from 'express';
import {createComment, deleteComment, getAllComments, updateComment} from '../controllers/commentController.js';
import {authenticateUser} from '../middlewares/index.js';
// ------------------------------------------

// router
const router = express.Router();

router.route('/').get(getAllComments).post(authenticateUser, createComment);

router.route('/:id').patch(authenticateUser, updateComment).delete(authenticateUser, deleteComment);

//  export router
export default router;
