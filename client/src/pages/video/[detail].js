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

  if (typeof videoData === String) return toast.error(videoData);

  return (
    <div className="bg-gray-900 w-full h-screen text-white grid justify-center pt-10">
      <ul>
        <li className=" p-5  border-2 rounded-2xl">
          <div className="text-xl my-3">Title : {videoData?.title}</div>
          <p className="mb-5">Description : {videoData?.description}</p>
          <video controls width="400">
            <source src={videoData?.fileUrl} type="video/webm"></source>
          </video>
          <p className="text-gray-500 py-3">created at .{videoData?.createdAt?.substring(0, 16)}</p>
          {/* see video button */}
        </li>
      </ul>
    </div>
  );
}
