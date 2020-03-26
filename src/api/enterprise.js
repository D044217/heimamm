import instance from "../utils/myhttp";

//封装企业列表接口
export function apiEnterprise({ name, page, limit, eid, username, status }) {
  return instance({
    url: "/enterprise/list",
    method: "GET",
    // headers: {
    //   token: window.localStorage.getItem("heimamm")
    // },
    params: {
      name: name,
      page: page,
      limit: limit,
      eid: eid,
      username: username,
      status: status
    }
  });
}
// 企业新增接口
export function apiEnterpriseAdd({ eid, name, short_name, intro, remark }) {
  return instance({
    url: "/enterprise/add",
    method: "POST",
    data: {
      eid: eid,
      name: name,
      short_name: short_name,
      intro: intro,
      remark: remark
    }
  });
}

// 企业状态切换接口
export function apiEnterpriseStatus(id) {
  return instance({
    url: "/enterprise/status",
    method: "POST",
    // headers: {
    //   token: window.localStorage.getItem("heimamm")
    // },
    data: {
      id: id
    }
  });
}
// 企业删除接口
export function apiEnterpriseDel(id) {
  return instance({
    url: "/enterprise/remove",
    method: "POST",
    data: {
      id: id
    }
  });
}
// 企业编辑接口
export function apiEnterpriseEdit({
  id,
  name,
  eid,
  short_name,
  intro,
  remark
}) {
  return instance({
    url: "/enterprise/edit",
    method: "POST",
    data: {
      id: id,
      name: name,
      eid: eid,
      short_name: short_name,
      intro: intro,
      remark: remark
    }
  });
}
