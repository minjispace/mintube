import {useQuery} from "@tanstack/react-query";
import {useRouter} from "next/router";
import {useState} from "react";
import {toast} from "react-hot-toast";
import {getSingleVideosData} from "../../utils/axios/videoAxios";

export default function singleVideo() {
  //  router
  const router = useRouter();
  const id = router.query.id;

  //  state
  const [video, setVideo] = useState("");
  const [videoId] = useState(id);

  // if (!video) return;

  //  react-query forgotPassword 요청
  const {} = useQuery({
    queryKey: ["getSingleVideos"],
    queryFn: () => getSingleVideosData(videoId),
    onError: (error) => toast.error(error?.response?.data?.msg),
    onSuccess: (data) => setVideo(data.data.video),
    refetchOnWindowFocus: false,
  });

  return (
    <div className="bg-gray-900 w-full h-screen text-white">
      <ul>
        <li className=" p-5  border-2 rounded-2xl">
          <div className="text-xl my-3">Title : {video?.title}</div>
          <p className="mb-5">Description : {video?.description}</p>
          <p className="text-gray-500 py-3">created at .{video?.createdAt?.substring(0, 16)}</p>
          {/* see video button */}
        </li>
      </ul>
    </div>
  );
}
