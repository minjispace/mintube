import {useRouter} from "next/router";
import {CreateComment} from "../../components";
import {getSingleVideosData} from "../../utils/axios/videoAxios";

export const getServerSideProps = async (context) => {
  const videoId = context?.query?.id;

  let videoData;

  try {
    //  react-query forgotPassword 요청
    const {
      data: {video},
    } = await getSingleVideosData(videoId);
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
  const router = useRouter();

  const {title, description, fileUrl, createdAt, id} = videoData;

  return (
    //  single video info
    <div className="bg-gray-900 w-full min-h-screen text-white  pt-20 px-20">
      <ul className="pt-10">
        <li>
          <div className="text-xl my-3">Title : {title}</div>
          <p className="mb-5">Description : {description}</p>
          <p className="text-gray-500 ">created at .{createdAt?.substring(0, 16)}</p>
          <video controls width="400">
            <source src={fileUrl} type="video/webm"></source>
          </video>
          {/* see video button */}
        </li>
      </ul>

      {/*  comment */}
      <div>
        <button
          className="mt-5 inline-flex items-center px-3 py-2 mx-3 text-sm font-normal text-center text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 dark:focus:ring-gray-700 mb-10"
          onClick={() => {
            router.push({
              pathname: `/comment`,
              query: {id},
            });
          }}
        >
          create comment
        </button>
        {videoData?.comment?.map((item) => (
          <CreateComment key={item.id} commentData={item} videoId={id} />
        ))}
      </div>
    </div>
  );
}
