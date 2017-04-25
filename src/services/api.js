import axios from './http'

const api = {

    //根据token获取user信息
    getUserInfo(params) {
        return axios.get('/userInfo').then(res => res.data);
    },

    //上传头像
    uploadImg(params){
        return 'http://api.io/api/admin/avatar';
    },

    //后台登录
    loginForm(params){
        return axios.post('/login', params)
    },

    /**
     * 会员列表路由
     */

    //创建会员
    createUser(params){
        return axios.post('/user', {params: params})
    },

    // 获取会员列表
    getUsers(params){
        return axios.get('/user', {params: params}).then(res => res.data);
    },

    //修改会员
    updateUser(id, params){
        return axios.put('/user/' + id, {params: params})
    },

    //删除会员
    deleteUser(id){
        return axios.delete('/user/' + id)
    },
    /**
     * 获取地区列表
     */
    getRegionList(){
        return axios.get('/getRegion')
    },


    /**
     * 会员组列表路由
     */

    //创建会员组
    createUserGroup(params){
        return axios.post('/user_group', {params: params})
    },

    // 获取会员组列表
    getUserGroup(params){
        return axios.get('/user_group', {params: params})
    },
    getAllUserGroup(){
        return axios.get('/getAllUserGroup')
    },

    //修改会员组
    updateUserGroup(id, params){
        return axios.put('/user_group/' + id, {params: params})
    },

    //删除会员组列表
    deleteUserGroup(id){
        return axios.delete('/user_group/' + id)
    },

    //根据ID获取会员组列表
    getUserGroupById(id){
        return axios.get('/user_group/' + id)
    }
};

export default api;