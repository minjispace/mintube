import express from 'express';
import {createVideo, updateVideo, deleteVideo, getAllVideos, getSingleVideo} from '../controllers/videoController.js';
import {authenticateUser, uploadFiles, authorizePermissionOwner} from '../middlewares/index.js';

// ------------------------------------------

// router
const router = express.Router();

router.route('/').post(authenticateUser, uploadFiles.single('video'), createVideo).get(getAllVideos);

router.route('/:id').get(getSingleVideo).patch(authenticateUser, authorizePermissionOwner('video'), updateVideo).delete(authenticateUser, authorizePermissionOwner('video'), deleteVideo);

//  export router
export default router;
