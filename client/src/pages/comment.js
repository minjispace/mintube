import {useMutation} from "@tanstack/react-query";
import {useRouter} from "next/router";
import React, {useState} from "react";
import {toast} from "react-hot-toast";
import {FormRow} from "../components";
import {uploadCommentData} from "../utils/axios/commentAxios";

export default function comment() {
  //  router
  const router = useRouter();

  //  state 설정
  const [message, setMessage] = useState("");

  // router로 passwordToken 설정
  const {
    query: {id: videoId},
  } = useRouter();

  // onChange
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  //  onSubmit
  const onSubmit = (e) => {
    e.preventDefault();
    mutate({message, videoId});
  };

  //  react-query register 요청
  const {mutate} = useMutation({
    mutationFn: ({message, videoId}) => uploadCommentData({message, videoId}),
    mutationKey: ["uploadComment"],
    onSuccess: () => router.push(`/video/detail?id=${videoId}`),
    onError: (error) => toast.error(error?.response?.data?.msg),
  });

  //  return rendering
  return (
    <div className=" bg-gray-900 h-screen pt-20">
      {/*  form */}
      <form className="mt-10 mb-10 w-4/5 m-auto " onSubmit={onSubmit}>
        <FormRow name="message" type="message" value={message} onChange={onChange} />

        {/*  upload button */}
        <button
          type="submit"
          className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  mt-5 "
        >
          upload comment
        </button>
      </form>
    </div>
  );
}
