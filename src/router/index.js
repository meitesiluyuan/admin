import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'

Vue.use(Router);

const routes= [
    {
        // 登录页
        path: '/login',
        name: '',
        component: resolve=>require(['@/components/auth/Login'],resolve)
    },
    {
        // 后台首页
        path:'/',
        name:'main',
        meta:{requireAuth:true},
        component:resolve=>require(['@/components/common/Home'],resolve),
        children:[
            // 会员列表页
            {
                path:'/member',
                meta:{requireAuth:true},
                component:resolve=>require(['@/components/member/Member'],resolve),
                name:'member'
            },
            //会员创建页
            {
                path:'/createMember',
                meta:{requireAuth:true},
                component:resolve=>require(['@/components/member/CreateMember'],resolve),
                name:'createMember'
            },

            //会员组列表页
            {
                path:'/group',
                meta:{requireAuth:true},
                component:resolve=>require(['@/components/memberGroup/Group'],resolve),
                name:'group'
            },

            //会员组创建页
            {
                path:'/createGroup',
                meta:{requireAuth:true},
                component:resolve=>require(['@/components/memberGroup/CreateGroup'],resolve),
                name:'createGroup'
            }
        ]
    }
];

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
    store.dispatch('set_token',window.localStorage.getItem('token'));
}


// 页面刷新时，重新赋值avatar,username
if (window.localStorage.getItem('avatar')&& window.localStorage.getItem('username')) {
    store.state.userInfo.avatar     = window.localStorage.getItem('avatar');
    store.state.userInfo.username   = window.localStorage.getItem('username');
}

const router = new Router({
    mode:'history',
    routes
});

//路由判断逻辑
router.beforeEach((to,form,next)=>{
    if (to.matched.some(r=>r.meta.requireAuth)) { // 判断该路由是否需要登录权限
        if (store.state.userInfo.token) { // 通过vuex state获取当前的token是否存在
            next();
        }else{
            next({
                path:'/login',
                query:{redirect:to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
            });
        }
    }else{
        next();
    }
});

export default router;
