// 全局过滤器
import Vue from "vue";
import moment from "moment";
Vue.filter("mytime", function(value) {
  return moment(value).format("YYYY-DD-MM");
});
