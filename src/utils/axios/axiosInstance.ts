import { IErrorResponse, TResponse } from "@/types";
import axios from "axios";
import { getFromLocalStorage } from "../local-storage";
import { authKey } from "@/constants/auth.constants";

const axiosInstance = axios.create();
axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
axiosInstance.defaults.headers["Accept"] = "application/json";
axiosInstance.defaults.timeout = 60000;

axiosInstance.interceptors.request.use(function (config) {
  const accessToken = getFromLocalStorage(authKey);
  if(accessToken){
    config.headers.Authorization = accessToken;
  }
    return config;
  }, function (error) {
    return Promise.reject(error);
  }
  // ,
  // { synchronous: true, runWhen: () => /* Questa funzione restituisce true */}
);

axiosInstance.interceptors.response.use(
  // @ts-ignore
  function onFulfilled(response): TResponse {
    return {
      data: response?.data?.data,
      meta: response?.data?.meta
    }
  }, function onRejected(error): IErrorResponse {
    return {
      statusCode: error?.response?.data?.statusCode || 500,
      message: error?.response?.data?.message || "Something went wrong??",
      errorMessage: error?.response?.data?.message
    }
  });


export { axiosInstance };
