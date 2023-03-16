import axios from "axios";

//  base api
export const axiosAPI = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

//  register api
const registerUserData = async ({name, email, password}) => {
  return await axiosAPI.post("/auth/register", {name, email, password});
};

//  login api
const loginUserData = async ({email, password}) => {
  return await axiosAPI.post("/auth/login", {email, password});
};

//  logout api
const logoutUserData = async () => {
  return await axiosAPI.delete("/auth/logout");
};

//  update username api
const updateUserNameData = async (name) => {
  return await axiosAPI.patch("/auth/user/name", {
    name,
  });
};
//  forgot password api
const forgotPasswordData = async (originalPassword) => {
  console.log(originalPassword, "axios password");
  return await axiosAPI.post("/auth/forgot/user/password", {
    originalPassword,
  });
};
//  forgot password api
const updatePasswordData = async ({paswordToken, email, newPassword}) => {
  return await axiosAPI.post("/auth/logout", {
    paswordToken,
    email,
    newPassword,
  });
};

export {registerUserData, loginUserData, logoutUserData, updateUserNameData, updatePasswordData, forgotPasswordData};
