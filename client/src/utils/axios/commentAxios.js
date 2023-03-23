import {axiosAPI} from "./axiosAPI";

// upload comment
const uploadCommentData = async ({message, videoId}) => {
  return await axiosAPI.post(`/comment`, {
    message,
    videoId,
  });
};

export {uploadCommentData};
