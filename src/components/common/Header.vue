<template>
    <div class="header">
        <div class="logo">后台管理系统</div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user-logo" :src="src">
                    {{username}}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                        <vue-core-image-upload
                                text='更换头像'
                                :crop="false"
                                :headers="headers"
                                :url="uploadUrl"
                                inputOfFile="avatar"
                                extensions="png,gif,jpeg,jpg"
                                @imageuploaded="imageuploaded">
                        </vue-core-image-upload>
                    </el-dropdown-item>
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
    import VueCoreImageUpload  from 'vue-core-image-upload';
    import api from '@/services/api'
    import { mapState } from 'vuex'
    export default{
        name:'header',
        data(){
            return{
            }
        },
        components: {
             VueCoreImageUpload
        },
        computed:mapState({
            headers:(state)=>{return {'Authorization':"bearer "+state.userInfo.token}},
            uploadUrl:()=>{return api.uploadImg()},
            src:state=>state.userInfo.avatar,
            username:state=>state.userInfo.username,
        }),

        methods: {
            /**
             * 头像上传完成后
             * @param res 返回的参数
             */
            imageuploaded(res) {
                if (res.errorcode == 0) {
                    let data={
                        member_list_headpic:res.src,
                        member_list_username:res.name
                    };
                    this.$store.dispatch('login',data)
                }
            },
            handleCommand(command) {
                if(command == 'logout'){
                    this.$store.dispatch('logout');
                    this.$router.push('/login');
                }
            }
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 60px;
        font-size: 22px;
        line-height: 60px;
        color: #fff;
    }
    .header .logo{
        float: left;
        width:250px;
        text-align: center;
    }
    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo{
        position: absolute;
        left:0;
        top:8px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>