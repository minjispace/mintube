import notFoundMiddleware from './not-found.js';
import errorHandlerMiddleware from './error-handler.js';
import {authenticateUser, authorizePermissionsForOnlyAdmin} from './auth.js';
import {uploadFiles} from './uploadVideo.js';

export {notFoundMiddleware, errorHandlerMiddleware, authenticateUser, authorizePermissionsForOnlyAdmin, uploadFiles};
