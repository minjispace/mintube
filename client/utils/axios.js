import axios from 'axios';

const axiosAPI = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
});

const registerUserData = async ({name, email, password}) => {
  return await axiosAPI.post('/auth/register', {name, email, password});
};

const loginUserData = async ({email, password}) => {
  return await axiosAPI.post('/auth/login', {email, password});
};

export {registerUserData, loginUserData};
