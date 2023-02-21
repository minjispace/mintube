//  create user controller
const registerUser = async (req, res) => {
  res.json('register user');
};

//  login user controller
const loginUser = async (req, res) => {
  res.json('login user');
};

//  update user controller
const updateUser = async (req, res) => {
  res.json('update user');
};

//  delete user  controller
const deleteUser = async (req, res) => {
  res.json('delte user');
};

//  logout user  controller
const logoutUser = async (req, res) => {
  res.json('logout User ');
};

//  get user all videos
const getUserVideos = async (req, res) => {
  res.json('get user all videosr');
};

//  get user all comments
const getUserComments = async (req, res) => {
  res.json('get user all comments');
};

export {registerUser, loginUser, updateUser, deleteUser, logoutUser, getUserComments, getUserVideos};
