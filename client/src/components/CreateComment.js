import {useSession} from "next-auth/react";
import React from "react";

export default function CreateComment({videoData}) {
  const {data: session} = useSession();
  const {
    id: videoId,
    message,
    createdAt,
    user: {name: userName, email: userEmail},
  } = videoData;

  //  user확인
  const isUser = userName === session?.user?.name && userEmail === session?.user?.email;

  //  handleDelete
  const handleDelete = () => {
    console.log("delete");
  };

  //  handleEdit
  const handleEdit = () => {
    console.log("edit");
  };

  return (
    <ul className=" border-2 rounded-2xl background-blue-400 p-5 w-2/6 my-3" key={videoId}>
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
        </>
      )}
    </ul>
  );
}
