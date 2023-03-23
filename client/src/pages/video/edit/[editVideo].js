import {useMutation} from "@tanstack/react-query";
import {useRouter} from "next/router";
import {useState} from "react";
import {FormRow} from "../../../components";
import {updateVideoData} from "../../../utils/axios/videoAxios";

export default function editVideo() {
  const router = useRouter();
  const {id, title, description} = router.query;

  // state
  const [values, setValues] = useState({
    title: "",
    description: "",
  });

  //  onChange
  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  };

  //  onSubmit
  const onSubmit = (e) => {
    e.preventDefault();
    const {title, description} = values;
    mutate({title, description, id});
  };

  //  react-query updatePassword
  const {mutate} = useMutation({
    mutationFn: ({title, description, id}) => updateVideoData({title, description, id}),
    mutationKey: ["updateVideo"],
    onError: (error) => toast.error(error?.response?.data?.msg),
    onSuccess: () => router.push("/"),
  });

  return (
    <div className=" bg-gray-900 h-screen pt-10">
      {/*  title */}
      <h2 className="text-center text-white text-4xl">Update Video</h2>

      {/*  form */}
      <form className="mt-10 w-4/5 m-auto" onSubmit={onSubmit}>
        <FormRow content={title} name="title" type="title" value={values.title} onChange={onChange} />

        <FormRow content={description} name="description" type="description" value={values.description} onChange={onChange} />

        {/*   button */}
        <button
          type="submit"
          className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  mt-5 "
        >
          update video
        </button>
      </form>
    </div>
  );
}
