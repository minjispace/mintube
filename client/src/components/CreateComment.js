import {useMutation} from "@tanstack/react-query";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import React, {useState} from "react";
import {toast} from "react-hot-toast";
import {deleteCommentData, editCommentData} from "../utils/axios/commentAxios";
import FormRow from "./FormRow";

export default function CreateComment({commentData, videoId}) {
  const {data: session} = useSession();
  const router = useRouter();

  const [editMode, setEditMode] = useState(false);
  const [editMessage, setEditMessage] = useState("");

  const {
    id,
    message,
    createdAt,
    user: {name: userName, email: userEmail},
  } = commentData;

  //  user확인
  const isUser = userName === session?.user?.name && userEmail === session?.user?.email;

  //  handleDelete
  const handleDelete = () => {
    if (!isUser) return;
    deleteMutate(id);
  };

  //  handleEdit
  const handleEdit = () => {
    if (!isUser) return;
    setEditMode(true);
  };

  //  handle update comment
  const handleUpdateComment = () => {
    setEditMode(false);
    editMutate({id, editMessage});
  };

  //  react-query deleteComment 요청
  const {mutate: deleteMutate} = useMutation({
    mutationFn: () => deleteCommentData(id),
    onError: (error) => toast.error(error?.response?.data?.msg),
  });

  //  react-query editComment 요청
  const {mutate: editMutate} = useMutation({
    mutationFn: () => editCommentData({id, editMessage}),
    onError: (error) => toast.error(error?.response?.data?.msg),
    onSuccess: () => router.push(`/video/detail?id=${videoId}`),
  });

  return (
    <ul className=" border-2 rounded-2xl background-blue-400 p-5 w-3/5 my-3 " key={id}>
      <div className="text-2xl">{userName}</div>
      <li>message : {message}</li>
      <p>createdAt.{createdAt}</p>

      {isUser && (
        <>
          {/*  edit button */}
          <button
            type="submit"
            className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  mt-5 mx-3 "
            onClick={handleEdit}
          >
            edit comment
          </button>

          {/*  delete button */}
          <button
            type="submit"
            className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  mt-5 "
            onClick={handleDelete}
          >
            delete comment
          </button>

          {/*  edit input */}
          <div className="mt-10">
            {editMode && (
              <>
                <FormRow mode="edit" content={message} name="editMessage" type="Edit comment message" value={editMessage} onChange={(e) => setEditMessage(e.target.value)} />
                <button
                  type="submit"
                  className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  mt-5 "
                  onClick={handleUpdateComment}
                >
                  update comment
                </button>
              </>
            )}
          </div>
        </>
      )}
    </ul>
  );
}
