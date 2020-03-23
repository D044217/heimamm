//导入vue-router
import vueRouter from "vue-router";
//导入vue
import Vue from "vue";
//注册vue-router
Vue.use(vueRouter);
//导入登录组件
import login from "../components/login.vue";
import index from "../components/index.vue";
import chart from "../components/chart.vue";
import user from "../components/user.vue";
import question from "../components/question.vue";
import enterprise from "../components/enterprise.vue";
import subject from "../components/subject.vue";

//导入store
import store from '../store/index'

// 导入 nprogress
import Nprogress from "../../node_modules/nprogress/nprogress";
import "../../node_modules/nprogress/nprogress.css";
// 导入获取用户信息的接口方法
import { apiInfo } from "../api/index";
// 导入message
import { Message } from "element-ui";
// 配置router
var router = new vueRouter({
  routes: [
    { path: "/", redirect: "/login" },
    { path: "/login", component: login, meta: { title: "黑马面面--登录" } },
    {
      path: "/index",
      component: index,
      children: [
        {
          path: "chart",
          component: chart,
          meta: { title: "黑马面面--数据概览" }
        },
        {
          path: "user",
          component: user,
          meta: { title: "黑马面面--用户列表" }
        },
        {
          path: "question",
          component: question,
          meta: { title: "黑马面面--题库列表" }
        },
        {
          path: "enterprise",
          component: enterprise,
          meta: { title: "黑马面面--企业列表" }
        },
        {
          path: "subject",
          component: subject,
          meta: { title: "黑马面面--学科列表" }
        }
      ],
      meta: { title: "黑马面面--主页" }
    }
  ]
});

//添加全局前置导航守卫   路由改变时执行
// to: 即将要进入的目标 路由对象
// from:  当前导航正要离开的路由
// next: 是否继续执行后边的代码
router.beforeEach((to, from, next) => {
  //判断meta是否存在存在title  如果有就设置给标题
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  //开启进度条
  Nprogress.start();
  // 判断是否在登录页面  如果不判断将进入死循环
  if (to.path !== "/login") {
    //判断是否存在token
    if (!window.localStorage.getItem("heimamm")) {
      // this.$message.error("您还没有登录,请登录");
      // this.$router.push("/login");
      // router.push("/login")
      //关闭进度条
      Nprogress.done();
      Message.error("您还没有登录,请登录");
      //既会跳转  也会执行后续代码
      next("/login");
    } else {
      apiInfo().then(res => {
        // 判断token的真假
        if (res.data.code === 200) {
          var userinfo={}
          userinfo.username=res.data.data.username
          userinfo.usericon=process.env.VUE_APP_URL + "/" + res.data.data.avatar;
          //this指向不对
          // this.$store.commit("setuserinfo",userinfo)
          store.commit("setuserinfo",userinfo)
          next();
        } else if (res.data.code === 206) {
          //token错误
          // this.$message.error("您还没有登录,请登录");
          // next()
          //关闭进度条
          Nprogress.done();
          Message.error("您还没有登录,请登录");
          //既会跳转  也会执行后续代码
          // this.$router.push("/login");
          // router.push("/login")
          next("/login");
        }
      });
    }
  } else {
    next();
  }
});

//添加全局后置导航守卫 路由改变后执行
router.afterEach(() => {
  Nprogress.done();
});

export default router;
