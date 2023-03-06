import express from 'express';
import {registerUser, loginUser, updateUserName, logoutUser, getUserComments, getUserVideos, forgotUserPassword, updateUserPassword} from '../controllers/authController.js';
import {authenticateUser} from '../middlewares/index.js';
// ------------------------------------------

// router
const router = express.Router();

// register & login & logout
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').delete(authenticateUser, logoutUser);

//  update
router.route('/user/name').patch(authenticateUser, updateUserName);
router.route('/forgot/user/password').post(authenticateUser, forgotUserPassword);
router.route('/user/password').patch(authenticateUser, updateUserPassword);

//  get user infos
router.route('/user/videos').get(getUserVideos);
router.route('/user/comments').get(getUserComments);

//  export router
export default router;
