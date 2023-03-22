import axios from "axios";
// ----------------------------------------------------------

//  base api
export const axiosAPI = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});
