import {toast} from "react-hot-toast";
import {getSingleVideosData} from "../../utils/axios/videoAxios";

export const getServerSideProps = async (context) => {
  const id = context?.query?.id;

  let videoData;

  try {
    //  react-query forgotPassword 요청
    const {
      data: {video},
    } = await getSingleVideosData(id);
    videoData = video;
  } catch (error) {
    return {
      notFound: true,
    };
  }
  return {props: {videoData}};
};

export default function detailVideo(props) {
  const {videoData} = props;

  console.log(videoData, "video");

  return (
    <div className="bg-gray-900 w-full h-screen text-white  pt-20 px-20">
      <ul className="pt-10">
        <li className=" ">
          <div className="text-xl my-3">Title : {videoData?.title}</div>
          <p className="mb-5">Description : {videoData?.description}</p>
          <video controls width="400">
            <source src={videoData?.fileUrl} type="video/webm"></source>
          </video>
          <p className="text-gray-500 py-3">created at .{videoData?.createdAt?.substring(0, 16)}</p>
          {/* see video button */}
        </li>
      </ul>

      <div>
        {videoData?.comment?.map((item) => {
          const {
            id: commentId,
            message,
            createdAt,
            user: {name: userName},
          } = item;
          return (
            <ul className="border-2 rounded-2xl background-blue-400 p-5 w-2/6" key={commentId}>
              <div className="text-2xl">{userName}</div>
              <li>message : {message}</li>
              <p>createdAt.{createdAt}</p>
            </ul>
          );
        })}
      </div>
    </div>
  );
}
