//登录页面api封装
import axios from "axios";
//导出登录请求函数
export function loginApi(phone, password,code) {
  return axios({
    url: process.env.VUE_APP_URL + "/login",
    method: "post",
    data: {
      phone: phone,
      password:password,
      code: code,
    },
     //即跨域必须携带 cookie
     withCredentials: true
  });
}
