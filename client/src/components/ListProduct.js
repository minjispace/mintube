import {useQuery} from "@tanstack/react-query";
import Link from "next/link";
import {useRouter} from "next/router";
import {useState} from "react";
import {toast} from "react-hot-toast";
import {deleteVideoData, getAllVideosData} from "../utils/axios/videoAxios";

const ListProduct = ({realUser}) => {
  //  state 설정
  const [videos, setVideos] = useState([]);

  //  router
  const router = useRouter();

  //  user확인
  const isUser = (name, email) => {
    return name === realUser?.name && email === realUser?.email;
  };

  //  react-query forgotPassword 요청
  const {} = useQuery({
    queryKey: ["getAllVideos"],
    queryFn: getAllVideosData,
    onError: (error) => toast.error(error?.response?.data?.msg),
    onSuccess: (data) => setVideos(data),
  });

  //  delete video
  const deleteVideo = async ({name, email, id}) => {
    if (!videos) return;
    if (isUser(name, email)) {
      await deleteVideoData(id);
      const tempVideo = videos?.data?.videos?.filter((item) => item.id !== id);
      setVideos(tempVideo);
      return;
    }
    return router.push("/login");
  };

  //  edit video
  const editVideo = ({name, email, id}) => {
    if (isUser(name, email)) {
      router.push({
        pathname: `/video/edit/${id}`,
        query: {id},
      });
    }
    return router.push("/");
  };

  //  video가 없을경우
  if (!videos) return <h1>no uploded video</h1>;

  //  return rendering
  return (
    <div className="text-white p-5 ">
      {videos?.data && <p>{videos?.data?.videoCount}개의 동영상</p>}
      <ul>
        {videos?.data?.videos?.map((item) => {
          const {
            id,
            title,
            createdAt,
            description,
            fileUrl,
            user: {email, name},
          } = item;
          return (
            <li className=" p-5 my-5 border-2 rounded-2xl" key={id}>
              <div className="text-xl my-3">Title : {title}</div>
              <p className="mb-5">Description : {description}</p>
              <p className="text-gray-500 py-3">created at .{createdAt.substring(0, 16)}</p>
              {/* see video button */}
              <Link
                className="py-2.5 px-5   text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                href={fileUrl}
              >
                see video
              </Link>

              {/*  see detail button */}
              <button
                className="py-2.5 px-5 mx-3  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={() => {
                  router.push({
                    pathname: `/video/${id}`,
                    query: {id},
                  });
                }}
              >
                see detail
              </button>

              {realUser?.email === email && realUser?.name === name && (
                <>
                  {/*  delete video button */}
                  <button
                    className="inline-flex items-center px-3 py-2 text-sm font-normal text-center text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 dark:focus:ring-gray-700"
                    onClick={() => deleteVideo({name, email, id})}
                  >
                    delete video
                  </button>

                  {/*  edit video button */}
                  <button
                    className="inline-flex items-center px-3 py-2 mx-3 text-sm font-normal text-center text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 dark:focus:ring-gray-700"
                    onClick={() => editVideo({name, email, id})}
                  >
                    edit video
                  </button>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ListProduct;
