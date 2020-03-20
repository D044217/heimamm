//封装注册请求接口的文件

import axios from "axios";
//导出验证码请求函数
export function getCodeApi(code, phone) {
  return axios({
    url: process.env.VUE_APP_URL + "/sendsms",
    method: "post",
    data: {
      code: code,
      phone: phone
    },
    //即跨域必须携带 cookie
    withCredentials: true
  });
}
//导出注册请求函数
export function registerApi(username, phone, email, avatar, password, rcode) {
  return axios({
    url: process.env.VUE_APP_URL + "/register",
    method: "post",
    data: {
      username: username,
      phone: phone,
      email: email,
      avatar: avatar,
      password: password,
      rcode: rcode
    }
  });
}
