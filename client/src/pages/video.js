import {useMutation} from "@tanstack/react-query";
import {useRouter} from "next/router";
import React, {useState} from "react";
import {FormRow} from "../components";
import {uploadVideoData} from "../utils/axios/videoAxios";

const video = () => {
  //  router 설정
  const router = useRouter();

  // state 설정
  const [video, setVideo] = useState(null);
  const [values, setValues] = useState({
    title: "",
    description: "",
  });

  //  react-query register 요청
  const {mutate} = useMutation({
    mutationFn: (formData) => uploadVideoData(formData),
    mutationKey: ["uploadVideo"],
    onSuccess: () => router.push("/"),
    onError: (error) => toast.error(error?.response?.data?.msg),
  });

  //  onChange
  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  };

  //  handleFileChange
  const handleFileChange = (e) => {
    setVideo(e.target.files[0]);
  };

  // onSubmit
  const onSubmit = (e) => {
    e.preventDefault();
    const {title, description} = values;

    //  mutate
    if (video && title && description) {
      const formData = new FormData();
      formData.append("video", video);
      formData.append("title", title);
      formData.append("description", description);
      mutate(formData);
    }
  };

  //  return rendering
  return (
    <div className=" bg-gray-900 h-screen pt-10">
      {/*  form */}
      <form className="mt-10 mb-10 w-4/5 m-auto " onSubmit={onSubmit}>
        <label className="mb-2 text-l font-medium text-white " htmlFor="file_input">
          Upload file (* please upload only video format file.)
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 tracking-wider my-2 "
          aria-describedby="file_input_help"
          id="file_input"
          type="file"
          accept="video/*"
          onChange={handleFileChange}
        />

        <FormRow name="title" type="title" value={values.title} onChange={onChange} />
        <FormRow name="description" type="description" value={values.description} onChange={onChange} />

        {/*  upload button */}
        <button
          type="submit"
          className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  mt-5 "
        >
          upload video
        </button>
      </form>
    </div>
  );
};

export default video;
