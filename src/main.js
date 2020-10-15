//入口文件

//导入 Vue 
import Vue from 'vue'
//导入 App 根组件
import app from './App.vue'

import VueRouter from 'vue-router'
//导入路由配置文件
import router from './router'
//导入vuex文件
import store from './store'

//
import '../src/plugins/vant'

import axios from 'axios'

Vue.prototype.axios = axios
axios.defaults.baseURL = 'http://localhost:3001'
Vue.use(VueRouter)

const vm = new Vue({
    el: '#app',
    render: h => h(app),
    router,
    store
})