import {axiosAPI} from "./axiosAPI";

// upload comment
const uploadCommentData = async ({message, videoId}) => {
  return await axiosAPI.post(`/comment`, {
    message,
    videoId,
  });
};

//  getAll Comments
const getAllCommentsData = async () => {
  return await axiosAPI.get("/comment");
};

//  edit comment
const editCommentData = async ({id, editMessage}) => {
  return await axiosAPI.patch(`/comment/${id}`, {
    message: editMessage,
  });
};

//  delete comment
const deleteCommentData = async (videoId) => {
  return await axiosAPI.delete(`/comment/${videoId}`);
};

export {uploadCommentData, editCommentData, deleteCommentData, getAllCommentsData};
