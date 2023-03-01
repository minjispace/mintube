import express from 'express';
import {createComment, deleteComment, getAllComments, updateComment} from '../controllers/commentController.js';
import {authenticateUser, authorizePermissionOwner} from '../middlewares/index.js';
// ------------------------------------------

// router
const router = express.Router();

router.route('/').get(getAllComments).post(authenticateUser, createComment);

router.route('/:id').patch(authenticateUser, authorizePermissionOwner('comment'), updateComment).delete(authenticateUser, authorizePermissionOwner('comment'), deleteComment);

//  export router
export default router;
