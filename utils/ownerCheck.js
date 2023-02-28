import {UnauthorizedError} from '../errors/index.js';

const authorizePermissionForOnlyOwner = (ownerId, providedId) => {
  // owner가 아닐때
  if (ownerId !== providedId) {
    throw new UnauthorizedError('Unauthorized to access this user.');
  }
  return;
};

export {authorizePermissionForOnlyOwner};
