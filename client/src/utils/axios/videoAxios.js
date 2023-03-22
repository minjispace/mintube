import {axiosAPI} from "./axiosAPI";

//  upload video
const uploadVideoData = async (formData) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  return await axiosAPI.post("/video", formData, config);
};

//  get all video
const getAllVideosData = async () => {
  return await axiosAPI.get("/video");
};

//  delete video
const deleteVideoData = async (id) => {
  return await axiosAPI.delete(`/video/${id}`);
};

//  edit video
const updateVideoData = async ({title, description, id}) => {
  console.log({title, description, id}, "@@axios");
  return await axiosAPI.patch(`/video/${id}`, {
    title,
    description,
  });
};

//  single video
const getSingleVideosData = async (id) => {
  console.log(id, "axios id");
  return await axiosAPI.get(`/video/${id}`);
};

export {uploadVideoData, getAllVideosData, deleteVideoData, updateVideoData, getSingleVideosData};
