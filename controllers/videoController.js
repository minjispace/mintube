//  create video
const createVideo = async (req, res) => {
  res.json({msg: 'create video'});
};

// update video
const updateVideo = async (req, res) => {
  res.json({msg: 'update video'});
};

//  delete video
const deleteVideo = async (req, res) => {
  res.json({msg: 'delete video'});
};

//  get all videos
const getAllVideos = async (req, res) => {
  res.json({msg: 'get all videos'});
};

//  get single video
const getSingleVideo = async (req, res) => {
  res.json({msg: 'get single video'});
};

export {createVideo, updateVideo, deleteVideo, getAllVideos, getSingleVideo};
