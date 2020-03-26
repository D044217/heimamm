import instance from "../utils/myhttp";

// 获取用户列表
export function apiUserList({ username, email, role_id, page, limit }) {
  return instance({
    url: "/user/list",
    method: "GET",
    // headers: {
    //   token: window.localStorage.getItem("heimamm")
    // },
    params: {
      username: username,
      email: email,
      role_id: role_id,
      page: page,
      limit: limit
    }
  });
}

// 新增用户
export function apiUserAdd({
  username,
  email,
  phone,
  role_id,
  status,
  remark
}) {
  return instance({
    url: "/user/add",
    method: "POST",
    // headers: {
    //   token: window.localStorage.getItem("heimamm")
    // },
    data: {
      username: username,
      email: email,
      phone: phone,
      role_id: role_id,
      status: status,
      remark: remark
    }
  });
}
// 设置用户状态
export function apiUserStatus(id) {
  return instance({
    url: "/user/status",
    method: "POST",
    // headers: {
    //   token: window.localStorage.getItem("heimamm")
    // },
    data: {
      id: id
    }
  });
}
// 删除用户
export function apiUserDel(id) {
  return instance({
    url: "/user/remove",
    method: "POST",
    // headers: {
    //   token: window.localStorage.getItem("heimamm")
    // },
    data: {
      id: id
    }
  });
}
// 编辑用户
export function apiUserEdit({
  id,
  username,
  phone,
  email,
  avatar,
  password,
  remark,
  status,
  role_id
}) {
  return instance({
    url: "/user/edit",
    method: "POST",
    // headers: {
    //   token: window.localStorage.getItem("heimamm")
    // },
    data: {
      id: id,
      username: username,
      phone: phone,
      email: email,
      avatar: avatar,
      password: password,
      remark: remark,
      status: status,
      role_id: role_id
    }
  });
}
