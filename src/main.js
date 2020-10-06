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

import axios from 'axios'

Vue.prototype.axios = axios
axios.defaults.baseURL = 'http://localhost:3001'

//按需引入vant-ui
import {
    Tabbar,
    TabbarItem,
    Search,
    Sidebar,
    SidebarItem,
    Swipe,
    SwipeItem,
    Grid,
    GridItem,
    Col,
    Row,
    TreeSelect,
    Lazyload,
    Image as VanImage,
    Toast,
    Card,
    Tag,
    GoodsAction,
    GoodsActionIcon,
    GoodsActionButton,
    Icon,
    ActionSheet,
    Button,
    Divider,
    Sku,
    Form,
    Field,
    Popup,
    Skeleton,
    Loading
} from 'vant';


Vue.use(Loading);
Vue.use(Skeleton);
Vue.use(VueRouter)
Vue.use(Popup);
Vue.use(Field);
Vue.use(Form);
Vue.use(Sku);
Vue.use(Divider);
Vue.use(ActionSheet);
Vue.use(Icon);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Button);
Vue.use(Toast);
Vue.use(Tag);
Vue.use(Card);
Vue.use(Lazyload);
Vue.use(VanImage);
Vue.use(TreeSelect);
Vue.use(Col);
Vue.use(Row);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(Search);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Grid);
Vue.use(GridItem);

const vm = new Vue({
    el: '#app',
    render: h => h(app),
    router,
    store
})