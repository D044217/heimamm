//封装axios文件
import axios from "axios";

// 创始一个 axios 实例对象
const instance = axios.create({
  baseURL: process.env.VUE_APP_URL,
  withCredentials: true
});
//axios 拦截器
instance.interceptors.request.use(
  function(config) {
    //将token设置在请求拦截器中
    //config是请求的全部内容
    config.headers.token = window.localStorage.getItem("heimamm");
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default instance