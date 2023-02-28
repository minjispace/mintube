import express from 'express';
import {createVideo, updateVideo, deleteVideo, getAllVideos, getSingleVideo} from '../controllers/videoController.js';
import {authenticateUser, authorizePermissionsForOnlyAdmin, uploadFiles} from '../middlewares/index.js';

// ------------------------------------------

// router
const router = express.Router();

router.route('/').post(authenticateUser, authorizePermissionsForOnlyAdmin('ADMIN'), uploadFiles.single('video'), createVideo).get(getAllVideos);

router.route('/:id').get(getSingleVideo).patch(authenticateUser, updateVideo).delete(authenticateUser, deleteVideo);

//  export router
export default router;
