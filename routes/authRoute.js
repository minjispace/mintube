import express from 'express';
import {registerUser, loginUser, updateUserName, deleteUser, logoutUser, getUserComments, getUserVideos, readyUpdateUserPassword, updateUserPassword} from '../controllers/authController.js';
import {authenticateUser} from '../middlewares/index.js';
// ------------------------------------------

// router
const router = express.Router();

// register & login
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

//  update
router.route('/user/name').patch(authenticateUser, updateUserName);
router.route('/ready/user/password').post(authenticateUser, readyUpdateUserPassword);
router.route('/user/password').patch(authenticateUser, updateUserPassword);

//  delete
router.route('/user').delete(authenticateUser, deleteUser);
router.route('/logout').delete(authenticateUser, logoutUser);

//  get user infos
router.route('/user/videos').get(getUserVideos);
router.route('/user/comments').get(getUserComments);

//  export router
export default router;
