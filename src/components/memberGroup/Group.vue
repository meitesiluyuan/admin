<template>
    <div id="Group">

        <el-row class="breadcrumb">
            <el-col :span="24">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>会员组管理</el-breadcrumb-item>
                    <el-breadcrumb-item>会员组列表</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <br>
        <el-row class="plugins-tips">
            <el-col :span="24">
                <el-button type="danger" @click="redirect">添加会员组</el-button>
            </el-col>
        </el-row>
        <br>
        <el-row>
            <el-col :span="24">
                <el-table :data="userGroup" border style="width: 100%">
                    <el-table-column label="会员组ID" prop="user_group_id" sortable width="200"></el-table-column>
                    <el-table-column label="会员组名称" prop="user_group_name" sortable width="300"></el-table-column>
                    <el-table-column label="积分满足条件" width="300">
                        <template scope="scope">
                            <span>{{scope.row.user_group_bomlimit}}</span> - <span>{{scope.row.user_group_toplimit}}</span> 积分
                        </template>
                    </el-table-column>
                    <el-table-column label="状态" width="300" show-overflow-tooltip>
                        <template scope="scope">
                            <el-switch
                                    v-model="scope.row.user_group_open"
                                    on-text="开"
                                    off-text="关"
                                    on-color="#13ce66"
                                    off-color="#ff4949"
                                    @change="changeStatus(scope.row.user_group_open,scope.row.user_group_id)">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="排序" prop="user_group_order" width="200" sortable></el-table-column>
                    <el-table-column label="操作">
                        <template scope="scope">
                            <el-button
                                    size="small"
                                    @click="Edit(scope.row.user_group_id)">编辑</el-button>
                            <el-button
                                    size="small"
                                    type="danger"
                                    @click="Delete(scope.row.user_group_id)">删除</el-button>
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
        name:'Group',
        data(){
            return {
                pagination:{
                    total:400, //总页数
                    current_page:1 //当前是第几页
                },
                pageSize:10, //每页显示的条数
                userGroup:[],
                searchForm:{
                    keyword:''
                }
            }
        },
        mounted(){
            this.fetchItem(this.pagination.current_page,this.pageSize,this.searchForm.keyword);
        },
        methods:{
            /**
             * 获取会员组列表
             * @param current_page 当前是第几页
             * @param pageSize 每页显示的数量
             * @param keyword 搜索关键词
             */
            fetchItem(current_page,pageSize,keyword){
                var _this=this;
                let params = {
                    page: current_page, //当前第几页
                    pageSize: pageSize, //每页显示条数
                    keyword:keyword //搜索条件
                };
                api.getUserGroup(params).then((res)=>{
                    _this.userGroup = res.data.result.data;
                    _this.pagination= res.data.result.pagination;
                }).catch((error)=>{
                    _this.$notify.error('error')
                })
            },
            /**
             * 每页显示多少条
             */
            handleSizeChange(pageSize) {
                this.pageSize=pageSize;
                this.fetchItem(this.pagination.current_page,pageSize,this.searchForm.keyword);
            },
            /**
             * 显示第几页
             */
            handleCurrentChange(current_page) {
                this.fetchItem(current_page,this.pageSize,this.searchForm.keyword);
            },
            /**
             * 编辑会员组信息
             * @param index
             * @param row
             * @constructor
             */
            Edit( row) {
                this.$router.push({ name: 'createGroup', params: { id: row }})
            },
            /**
             * 删除会员组信息
             * @param row 会员组id
             * @constructor
             */
            Delete(row) {
                this.$confirm('此操作将永久删除该分组, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    api.deleteUserGroup(row).then((res)=>{
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

            /**
             * 更改会员组开启状态
             * @param id
             */
            changeStatus(status,id){
                let params={
                    user_group_open:status
                };
                api.updateUserGroup(id,params);
            },
            //
            redirect(){
                this.$router.push({path:'/createGroup'})
            }


        }
    }
</script>