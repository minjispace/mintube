import express from 'express';
import {createComment, deleteComment, getAllComments, updateComment} from '../controllers/commentController.js';
import {authenticateUser, authorizePermissionsForOnlyAdmin} from '../middlewares/index.js';
// ------------------------------------------

// router
const router = express.Router();

router.route('/').get(getAllComments).post(authenticateUser, authorizePermissionsForOnlyAdmin('ADMIN'), createComment);

router.route('/:id').patch(authenticateUser, authorizePermissionsForOnlyAdmin('ADMIN'), updateComment).delete(authenticateUser, authorizePermissionsForOnlyAdmin('ADMIN'), deleteComment);

//  export router
export default router;
