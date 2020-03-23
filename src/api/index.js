// 封装首页请求的方法
import axios from 'axios'
// 创始一个 axios 实例对象
const instance = axios.create({
    baseURL: process.env.VUE_APP_URL,
    withCredentials: true
})

// 封装用户信息的接口
export function apiInfo () {
    return instance({
        url: '/info',
        method: 'GET',
        headers: {
            token: window.localStorage.getItem('heimamm')
        }
    })
}
// 封装退出服务器的接口
export function logoutApi(){
    return instance({
        url: '/logout',
        method: 'GET', 
        headers: {
            token: window.localStorage.getItem('heimamm')
        }
    })
}
