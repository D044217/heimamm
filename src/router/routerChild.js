
import chart from "../components/chart.vue";
import user from "../components/user.vue";
import question from "../components/question.vue";
import enterprise from "../components/enterprise.vue";
import subject from "../components/subject.vue";
export default [
    {
      path: "chart",
      component: chart,
      meta: { title: "数据概览" ,roles: ["超级管理员","管理员", "老师"],pullpath:"/index/chart"}
    },
    {
      path: "user",
      component: user,
      meta: { title: "用户列表" ,roles: ["超级管理员","管理员", "老师"],pullpath:"/index/user"}
    },
    {
      path: "question",
      component: question,
      meta: { title: "题库列表" ,roles: ["超级管理员","管理员", "老师", "学生"],pullpath:"/index/question"}
    },
    {
      path: "enterprise",
      component: enterprise,
      meta: { title: "企业列表" ,roles: ["超级管理员","管理员"],pullpath:"/index/enterprise"}
    },
    {
      path: "subject",
      component: subject,
      meta: { title: "学科列表" ,roles: ["超级管理员", "管理员"],pullpath:"/index/subject"}
    }
  ]