<template>
    <div id="CreateGroup">
        <el-row class="breadcrumb">
            <el-col :span="24">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>会员组管理</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/group' }">会员组列表</el-breadcrumb-item>
                    <el-breadcrumb-item>会员组{{is_update?'更新':'创建'}}</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <br>
        <el-row class="plugins-tips">
            <el-col :span="24">
                <span>{{is_update?'更新':'创建'}}会员</span>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="12" :offset="6">
                <el-form ref="userGroup" :model="userGroup" :rules="rules" label-width="100px">
                    <el-form-item label="会员组名称:" prop="user_group_name" >
                        <el-col :span="19">
                            <el-input v-model="userGroup.user_group_name" placeholder="会员组名称"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="积分条件:" required>
                        <el-col :span="8">
                            <el-form-item prop="user_group_bomlimit">
                                <el-input v-model.number="userGroup.user_group_bomlimit" placeholder="下限积分"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col class="line" :span="2" :offset="1">-</el-col>
                        <el-col :span="8">
                            <el-form-item prop="user_group_toplimit">
                                <el-input v-model.number="userGroup.user_group_toplimit" placeholder="上限积分"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="排序:" prop="user_group_order">
                        <el-col :span="8">
                            <el-input v-model.number="userGroup.user_group_order" placeholder="排序"></el-input>
                        </el-col>
                        <el-col :span="8" :offset="1">
                            <i class="red">*</i> <span class="color">从小到大排序</span>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="是否开启:">
                        <el-col :span="8">
                            <el-switch
                                    v-model="userGroup.user_group_open"
                                    on-text="开"
                                    off-text="关"
                                    on-color="#13ce66"
                                    off-color="#ff4949">
                            </el-switch>
                            <span class="color">默认关闭</span>
                        </el-col>
                    </el-form-item>
                    <el-form-item>

                        <el-button type="primary" @click="submitForm('userGroup')" v-if="!is_update">立即创建</el-button>
                        <el-button type="primary" @click="updateForm('userGroup')" v-else>更新保存</el-button>

                        <el-button @click="resetForm('userGroup')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import api from '@/services/api'
    export default{
        name:'CreateGroup',
        data(){
            return {
                userGroup:{
                    user_group_name:'',
                    user_group_open:false,
                    user_group_toplimit:0,
                    user_group_bomlimit:0,
                    user_group_order:50
                },
                is_update:false,
                rules:{
                    user_group_name: [
                        { required: true, message: '请输入会员组名称', trigger: 'blur' },
                    ],
                    user_group_toplimit:[
                        { required: true, message: '请输入上限积分'},
                        { type: 'number', message: '积分必须为数字值'}
                    ],
                    user_group_bomlimit:[
                        { required: true, message: '请输入下限积分'},
                        { type: 'number', message: '积分必须为数字值'}
                    ],
                    user_group_order:[
                        { required: true, message: '请输入排序值'},
                        { type: 'number', message: '排序值必须为数字值'}
                    ],
                }
            }
        },
        mounted(){
            /**
             * 判断是否是更新会员组信息
             */
            if(this.$route.params.id !==undefined){
                this.is_update=true;
                api.getUserGroupById(this.$route.params.id).then((res)=>{
                    if (res.status==200) {
                        this.userGroup=res.data.result;
                    }
                })
            }
        },
        methods:{
            /**
             * 提交表单
             * @param formName
             */
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params=this.userGroup;

                        api.createUserGroup(params).then((res)=>{
                            if (res.data.code==200) {
                                this.$notify.success(res.data.message);
                                this.$router.push({path:'group'})
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            /**
             * 更新会员组信息
             * @param formName
             */
            updateForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params=this.userGroup;
                        api.updateUserGroup(this.$route.params.id,params).then((res)=>{
                            if (res.data.code==200) {
                                this.$notify.success(res.data.message);
                                this.$router.push({path:'group'})
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            /**
             * 清空表单
             * @param formName
             */
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
    .red{
        color: red;

    }
    .line{
        color: #8b9aa3;
    }
    .color{
        color: #8b9aa3;
    }
</style>