<template>
    <div id="CreateMember">
        <el-row class="breadcrumb">
            <el-col :span="24">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>会员管理</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/member' }">会员列表</el-breadcrumb-item>
                    <el-breadcrumb-item>会员{{is_update?'更新':'创建'}}</el-breadcrumb-item>
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
                <el-form ref="member" :model="member" :rules="rules" label-width="100px">

                    <el-form-item label="所属会员组" >
                        <el-select v-model="member.member_list_groupid" placeholder="所属会员组" style="width: 100%">
                            <el-option v-for="item in member_group" :label="item.user_group_name" :value="item.user_group_id"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="用户名"  prop="member_list_username">
                        <el-input v-model="member.member_list_username" placeholder="用户名必须是以字母开头，数字、符号组合"></el-input>
                    </el-form-item>

                    <el-form-item label="登录密码"  prop="member_list_pwd">
                        <el-input type="password" v-model="member.member_list_pwd" placeholder="密码必须大于6位，小于15位"></el-input>
                    </el-form-item>

                    <el-form-item label="昵称">
                        <el-input  v-model="member.member_list_nickname" placeholder="输入昵称"></el-input>
                    </el-form-item>

                    <el-form-item label="积分">
                        <el-input  v-model="member.score"></el-input>
                    </el-form-item>

                    <el-form-item label="金币">
                        <el-input  v-model="member.coin"></el-input>
                    </el-form-item>

                    <el-form-item label="所在地" required>
                        <el-cascader
                                :options="region"
                                v-model="selectedregion"
                                :props="props"
                                style="width: 100%"
                                @change="handerChange"
                        ></el-cascader>
                    </el-form-item>

                    <el-form-item label="性别">
                        <el-radio-group v-model="member.member_list_sex">
                            <el-radio label="程序员" value="1"></el-radio>
                            <el-radio label="程序媛" value="2"></el-radio>
                            <el-radio label="保密" value="3"></el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="手机号" prop="member_list_tel">
                        <el-input  v-model="member.member_list_tel" placeholder="输入手机号"></el-input>
                    </el-form-item>

                    <el-form-item label="个人网站">
                        <el-input  v-model="member.user_url" placeholder="http://开头"></el-input>
                    </el-form-item>

                    <el-form-item label="签名">
                        <el-input type="textarea" v-model="member.signature"></el-input>
                    </el-form-item>

                    <el-form-item  label="联系人邮箱" prop="member_list_email">
                        <el-input v-model="member.member_list_email" placeholder="用于找回密码"></el-input>
                    </el-form-item>

                    <el-form-item  label="是否审核" >
                        <el-switch
                                v-model="member.member_list_open"
                                on-text="是"
                                off-text="否"
                                on-color="#13ce66"
                                off-color="#ff4949">
                        </el-switch>
                    </el-form-item>

                    <el-form-item  label="是否激活" >
                        <el-switch
                                v-model="member.user_status"
                                on-text="是"
                                off-text="否"
                                on-color="#13ce66"
                                off-color="#ff4949">
                        </el-switch>
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
        name:'CreateMember',
        data(){
            return {
                props: {
                    value: 'id',
                    label:'name',
                    children: 'children'
                },
                region:[],//地区列表
                selectedregion:[],
                member:{
                    member_list_sex:1,
                    member_list_open:true,
                    user_status:false,
                    member_list_groupid:1,
                },
                member_group:[],
                is_update:false,
                rules:{
                    member_list_username:[
                        {required:true,message:'用户名不能为空', trigger: 'blur' },
                        { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
                    ],
                    member_list_pwd:[
                        {required:true,message:'密码不能为空', trigger: 'blur' },
                        { min: 6, max: 15, message: '密码必须大于6位，小于15位', trigger: 'blur' }
                    ],
                    member_list_tel:[
                        {required:true,message:'手机号不能为空', trigger: 'blur',type:'number' },
                    ],
                    member_list_email:[
                        {required:true,message:'邮箱不能为空', trigger: 'blur',type:'email' },
                    ],
                }
            }
        },
        mounted(){
            /**
             * 获取地区列表
             */
            api.getRegionList().then((res)=>{
                if (res.data.code==200) {
                    this.region=res.data.result;
                }
            });

            /**
             * 获取会员分组列表
             */
            api.getAllUserGroup().then((res)=>{
                if (res.data.code==200) {
                    this.member_group=res.data.result;
                }
            });
            /**
             * 判断是否是更新会员组信息
             */
            if(this.$route.params.id !==undefined){
                this.is_update=true;
                api.getUserGroupById(this.$route.params.id).then((res)=>{
                    if (res.status==200) {
                        this.userGroup=res.data;
                    }
                })
            }
        },
        methods:{

            handerChange(val){
                console.log(val)
            },

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
                                this.$router.push({path:'IndexGroup'})
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
                                this.$router.push({path:'IndexGroup'})
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