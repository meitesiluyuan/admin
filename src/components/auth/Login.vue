<template>
    <div id="Login">
        <el-row>
            <el-col :offset="9" :span="5">
                <el-form  ref="LoginForm" :model="LoginForm" :rules="rules" label-width="100px">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="LoginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="LoginForm.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="loginSubmit('LoginForm')">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import api from '@/services/api'
    export default {
        name: 'Login',
        data() {
            return {
                LoginForm: {
                    email: '',
                    password: ''
                },
                rules:{
                    username:[
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    password:[
                        {required:true, message:'请输入密码', trigger:'blur'}
                    ]
                }
            }
        },
        methods: {
            loginSubmit(formName) {
                var _this=this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params={username:this.LoginForm.username, password:this.LoginForm.password};
                        api.loginForm(params).then((res)=>{
                            if (res.status==200) {
                                this.$store.dispatch('set_token',res.data.token);
                                api.getUserInfo().then((data)=>{
                                    console.log(data);
                                    this.$store.dispatch('login',data.user);
                                });
                                this.$router.push({path:'/'});
                            }
                        }).catch(function () {
                            _this.$notify.error('用户名或密码错误');
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>
<style scoped>
    #Login{
        margin-top: 10%;
    }
</style>
