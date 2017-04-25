/**
 * Created by Admin on 2017/4/10.
 */
import Vue from 'vue'
import axios from 'axios'
import store from '../store/index'
import router from '../router/index'

Vue.prototype.axios = axios;

//axios 配置
axios.defaults.timeout=5000;
axios.defaults.baseURL = 'http://api.io/api/admin';


// http request 拦截器
axios.interceptors.request.use(
    config=>{
        if (store.state.userInfo.token) {
            config.headers['Authorization']=`bearer ${store.state.userInfo.token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }

);

//http response 拦截器
axios.interceptors.response.use(
    response=>{
        return response;
    },
    error=>{
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 401 清除token信息并跳转到登录页面
                this.$store.dispatch('logout');
                router.replace({
                    path:'/login',
                    query: {redirect: router.currentRoute.fullPath}
                })
            }
        }
        return Promise.reject(error.response.data);
    }
);


export default axios;