const axios = require("axios");
const instance = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
export const get = (url, params) => instance.get(url, { params });
export const post = (url, data) => instance.post(url, { data });
export const put = (url, data) => instance.put(url, { data });
export const delet = (url, data) => instance.delete(url);
// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    console.log("interceptor response", response);
    return response;
  },
  function (error) {
    console.log("interceptor error", error);
    return Promise.reject(error);
  }
);
