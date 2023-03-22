import {useQuery} from "@tanstack/react-query";
import Link from "next/link";
import {toast} from "react-hot-toast";
import {getAllVideosData} from "../utils/axios/videoAxios";

const ListProduct = () => {
  //  react-query forgotPassword 요청
  const {data} = useQuery({
    queryKey: ["getAllVideos"],
    queryFn: getAllVideosData,
    onError: (error) => toast.error(error?.response?.data?.msg),
  });

  if (!data) return <h1>no uploded video</h1>;
  return (
    <div className="text-white p-5 ">
      <p>{data?.data?.videoCount}개의 동영상</p>
      <ul>
        {data?.data?.videos?.map((item) => {
          const {id, title, createdAt, description, fileUrl, user} = item;
          return (
            <li className=" p-5 my-5 border-2 rounded-2xl" key={id}>
              <div className="text-xl my-3">{title}</div>
              <p className="mb-5">{description}</p>
              <Link
                className="py-2.5 px-5   text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                href={fileUrl}
                target="_blank"
              >
                see video
              </Link>
              <Link
                className="py-2.5 px-5 mx-3  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                href={`/video/${id}`}
              >
                see detail
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ListProduct;
