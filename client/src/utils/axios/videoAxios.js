import {axiosAPI} from "./axiosAPI";

const uploadVideoData = async (formData) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  return await axiosAPI.post("/video", formData, config);
};

export {uploadVideoData};
