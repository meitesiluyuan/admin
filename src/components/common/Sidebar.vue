<template>
    <div class="sidebar">
        <el-menu :default-active="$route.name"   :router=true>
            <el-menu-item index=""><i class="fa fa-tachometer" aria-hidden="true"></i> 控制面板</el-menu-item>
            <el-submenu index="/">
                <template slot="title"><i class="fa fa-users" aria-hidden="true"></i> 会员管理</template>
                <el-menu-item-group>
                    <el-menu-item index="member"><i class="fa fa-circle-o" aria-hidden="true"></i> 会员列表</el-menu-item>
                    <el-menu-item index="group"><i class="fa fa-circle-o" aria-hidden="true"></i> 会员组</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title"><i class="fa fa-lock" aria-hidden="true"></i> 权限管理</template>
                <el-menu-item-group>
                    <el-menu-item index="3-1"><i class="fa fa-circle-o" aria-hidden="true"></i> 权限列表</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>



<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 60px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
