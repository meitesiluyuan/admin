import * as types from './mutation-types'

export default {
    //设置token
    [types.SET_TOKEN](state,token){
        localStorage.token          = token;
        state.userInfo.token        = token;
    },
    //登录
    [types.LOGIN](state,data){
        localStorage.avatar         = data.member_list_headpic;
        localStorage.username       = data.member_list_username;
        state.userInfo.avatar       = data.member_list_headpic;
        state.userInfo.username     = data.member_list_username;
    },
    //退出
    [types.LOGOUT](state){
        localStorage.removeItem('avatar');
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        state.userInfo.avatar=null;
        state.userInfo.username=null;
        state.userInfo.token=null;
    }
}