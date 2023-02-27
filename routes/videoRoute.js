import express from 'express';
import {createVideo, updateVideo, deleteVideo, getAllVideos, getSingleVideo} from '../controllers/videoController.js';
import {authenticateUser, authorizePermissionsForOnlyAdmin} from '../middlewares/index.js';

// ------------------------------------------

// router
const router = express.Router();

router.route('/').post(authenticateUser, authorizePermissionsForOnlyAdmin('ADMIN'), createVideo).get(getAllVideos);

router
  .route('/:id')
  .get(getSingleVideo)
  .patch(authenticateUser, authorizePermissionsForOnlyAdmin('ADMIN'), updateVideo)
  .delete([authenticateUser, authorizePermissionsForOnlyAdmin('ADMIN')], deleteVideo);

//  export router
export default router;
