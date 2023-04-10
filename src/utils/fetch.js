import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URI,
});

export const axiosFetch = async ({ method, url, params, data, headers }) => {
  try {
    const response = await instance.request({
      method,
      url,
      params,
      data,
      withCredentials: true,
      headers
    });

    const responseData = await response.data;
    const status = await response.status;

    return {
      responseData,
      status,
    };
  } catch (error) {
    const axiosError = await error.response;
    return axiosError;
  }
};
