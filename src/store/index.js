// vuex的仓库
//导入 vue
import Vue from 'vue'
// 导入vuex
import Vuex from 'vuex'
// 使用
Vue.use(Vuex)
//创建 store对象
const store = new Vuex.Store({
    state:{
        username:"",
        usericon:""
    },
    mutations:{
        setuserinfo:function(state,payload){
            state.username=payload.username
            state.usericon=payload.usericon
        }
    }
})

// 暴露
export default store
