import * as types from './mutation-types'

export default {
    //设置token
    set_token({commit},token){
        commit(types.SET_TOKEN,token);
    },
    //登录
    login({commit},data){
        commit(types.LOGIN,data);
    },
    //退出
    logout({commit}){
        commit(types.LOGOUT);
    }
}