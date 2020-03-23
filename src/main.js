import Vue from "vue";
import App from "./App.vue";
//导入路由 vue-router
import router from "./router/index";
// 导入store 
import  store from './store/index'
//导入element_ui
import ElementUI from 'element-ui';
//导入element_ui 样式
import 'element-ui/lib/theme-chalk/index.css';
//注册element_ui
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");

import('./lib/css/index.css')