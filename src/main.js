// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
import '../static/css/theme-green/index.css';       // 浅绿色主题
import App from './App'
import store from './store'
import 'font-awesome/css/font-awesome.min.css'
import router from './router'

Vue.use(ElementUI);


Vue.config.productionTip = false;




/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
});
