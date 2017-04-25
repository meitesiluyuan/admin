<template>
    <div id="Member">
        <el-row class="breadcrumb">
            <el-col :span="24">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>会员管理</el-breadcrumb-item>
                    <el-breadcrumb-item>会员列表</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <br>
        <el-row class="plugins-tips">
            <el-col :span="24">
                <el-button type="danger"><router-link :to="{ path: '/createMember' }" style="color: #fff;">添加会员</router-link></el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-table
                        :data="users"
                        border
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55"></el-table-column>

                    <el-table-column  prop="member_list_id" label="ID" width="80"></el-table-column>

                    <el-table-column prop="member_list_username" label="用户名" width="150"></el-table-column>

                    <el-table-column label="昵称/邮箱" width="200">
                        <template scope="scope">
                            <span>{{scope.row.member_list_nickname}}</span>【<span>{{scope.row.member_list_email}}</span>】
                        </template>
                    </el-table-column>

                    <el-table-column prop="member_list_from" label="来源" width="80"></el-table-column>

                    <el-table-column prop="member_list_sex" label="性别" width="80"></el-table-column>

                    <el-table-column prop="user_group.user_group_name" label="会员用户组" width="150"></el-table-column>

                    <el-table-column prop="score" label="积分" width="80"></el-table-column>

                    <el-table-column  label="添加时间" width="200">
                        <template scope="scope">{{ scope.row.created_at }}</template>
                    </el-table-column>
                    <el-table-column label="状态" width="100">
                        <template scope="scope">
                            <el-switch
                                    v-model="scope.row.user_status"
                                    on-text="开"
                                    off-text="关"
                                    on-color="#13ce66"
                                    off-color="#ff4949">
                            </el-switch>
                        </template>
                    </el-table-column>

                    <el-table-column label="激活" width="100">
                        <template scope="scope">
                            <el-switch
                                    v-model="scope.row.user_activation_key"
                                    on-text="已激活"
                                    off-text="未激活"
                                    :width="width"
                                    on-color="#13ce66"
                                    off-color="#ff4949">
                            </el-switch>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" show-overflow-tooltip>
                        <template scope="scope">
                            <el-button
                                    size="small"
                                    @click="Edit(scope.row.member_list_id)">编辑</el-button>
                            <el-button
                                    size="small"
                                    type="danger"
                                    @click="Delete(scope.row.member_list_id)">删除</el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </el-col>
        </el-row>
        <br>
        <el-row class="plugins-tips">
            <el-col :span="24">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pagination.current_page"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="pageSize"
                        layout="sizes, prev, pager, next"
                        :total="pagination.total">
                </el-pagination>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import api from '@/services/api'
    export default{
        name:'Member',
        data(){
            return{
                width:70,
                pagination:{
                    total:400,
                    current_page:1
                },
                pageSize:10,
                users:[],
                searchFrom:{
                    keyword:''
                },
            }
        },
        mounted(){
            this.fetchItem(this.pagination.current_page,this.pageSize);
        },
        methods:{
            fetchItem(current_page,pageSize){
                var _this=this;

                let params={
                    page: current_page, //当前第几页
                    pageSize: pageSize, //每页显示条数
//                    keyword:keyword //搜索条件
                };

                api.getUsers(params).then((res)=>{
                    if (res.code==200) {
                        _this.users=res.result.data;
                        _this.pagination=res.result.pagination;
                    }
                }).catch(()=>{

                })
            },
            /**
             * 每页显示多少条
             */
            handleSizeChange(pageSize) {
                this.pageSize=pageSize;
                this.fetchItem(this.pagination.current_page,pageSize);
            },
            /**
             * 显示第几页
             */
            handleCurrentChange(current_page) {
                this.fetchItem(current_page,this.pageSize);
            },

            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            /**
             * 更新会员
             * @param index
             * @param row
             * @constructor
             */
            Edit(row){
                this.$router.push({ name: 'createMember', params: { id: row }})
            },
            /**
             * 删除会员
             * @param index
             * @param row
             * @constructor
             */
            Delete(row){
                this.$confirm('此操作将永久删除该会员, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    api.deleteUser(row).then((res)=>{
                        if (res.data.code==200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!',
                                duration:2000
                            });
                            setInterval(function () {
                                location.reload();
                            },2000)
                        }
                    });

                }).catch(() => {

                });
            },
        }
    }
</script>
