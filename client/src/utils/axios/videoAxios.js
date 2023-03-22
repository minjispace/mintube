import {axiosAPI} from "./axiosAPI";

const uploadVideoData = async (formData) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  return await axiosAPI.post("/video", formData, config);
};

const getAllVideosData = async () => {
  return await axiosAPI.get("/video");
};

export {uploadVideoData, getAllVideosData};
