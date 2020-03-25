//封装学科列表请求接口的文件
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
    config.headers.token=window.localStorage.getItem("heimamm")
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

//封装学科列表接口
export function apiSubject({name, page, limit, rid, username, status}) {
  return instance({
    url: "/subject/list",
    method: "GET",
    // headers: {
    //   token: window.localStorage.getItem("heimamm")
    // },
    params: {
      name: name,
      page: page,
      limit: limit,
      rid: rid,
      username: username,
      status: status
    }
  });
}

//设置学科状态切换接口
export function apiChangeStatus(id) {
    return instance({
      url: "/subject/status",
      method: "POST",
      // headers: {
      //   token: window.localStorage.getItem("heimamm")
      // },
    data:{
        id:id
    }   
    });
  }
// 学科新增接口
export function apiSubjectAdd({rid,name,short_name,intro,remark}) {
  return instance({
    url: "/subject/add",
    method: "POST",
  data:{
      rid:rid,
      name:name,
      short_name:short_name,
      intro:intro,
      remark:remark
  }   
  });
}
// 学科编辑接口
export function apiSubjectEdit({rid,name,short_name,intro,remark,id}) {
  return instance({
    url: "/subject/edit",
    method: "POST",
    data:{
      rid:rid,
      name:name,
      short_name:short_name,
      intro:intro,
      remark:remark,
      id:id
  }  
  });
}

// 学科删除接口
export function apiSubjectDel(id) {
  return instance({
    url: "/subject/remove",
    method: "POST",
    data:{
      id:id
  }  
  });
}