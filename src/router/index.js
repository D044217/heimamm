//导入vue-router
import vueRouter from "vue-router";
//导入vue
import Vue from "vue";
//注册vue-router
Vue.use(vueRouter);
//导入登录组件
import login from "../components/login.vue";
import index from "../components/index.vue";

//配置router
var router = new vueRouter({
  routes: [
   
    { path: "/", redirect: "/login" },
    { path: "/login", component: login },
    { path: "/index", component: index },
  ]
});
export default router;
