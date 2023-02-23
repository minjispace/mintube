import express from 'express';
import {registerUser, loginUser, updateUser, deleteUser, logoutUser, getUserComments, getUserVideos, refreshToken} from '../controllers/authController.js';
// ------------------------------------------

// router
const router = express.Router();

// route setting
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/refresh/token').post(refreshToken);
router.route('/update/user').patch(updateUser);
router.route('/delete/user').delete(deleteUser);
router.route('/logout').get(logoutUser);
router.route('/get/user/videos').get(getUserVideos);
router.route('/get/user/comments').get(getUserComments);

//  export router
export default router;
