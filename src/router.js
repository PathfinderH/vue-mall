import VueRouter from 'vue-router'

//导入tabbar路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import ClassifyContainer from './components/tabbar/ClassifyContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import MineContainer from './components/tabbar/MineContainer.vue'

//导入商品详情页面路由组件
import ProductPetails from './components/product/ProductPetails.vue'

//导入数码产品页面路由组件
import DigitalProductContainer from './components/home_child/DigitalProductContainer.vue'

//登录注册组件
import LoginContainer from './components/register&login/LoginContainer.vue'
import RegisterContainer from './components/register&login/RegisterContainer.vue'

//个人页面 设置 组件
import SetContainer from './components/mine/SetContainer.vue'
//个人页面 我的收货地址 组件
import MyAddressContainer from './components/mine/MyAddressContainer.vue'
//个人页面 我的收货地址 编辑收货地址 组件
import EditAddressContainer from './components/mine/EditAddressContainer.vue'

// 创建路由对象
const router = new VueRouter({
    routes: [ // 配置路由规则
        // tabbar路由
        { path: '/', redirect: '/home' },
        { path: '/home', component: HomeContainer },
        { path: '/classify', component: ClassifyContainer, },
        { path: '/search', name: 'search', component: SearchContainer },
        { path: '/shopcar', component: ShopcarContainer },
        { path: '/mine', component: MineContainer },

        // 商品详情页面路由
        { path: '/home/product:id', component: ProductPetails },

        //数码产品页面路由
        { path: '/home/digital_paroduct', component: DigitalProductContainer },

        //注册登录路由
        { path: '/login', component: LoginContainer },
        { path: '/register', component: RegisterContainer },

        //个人页面设置
        { path: '/mine/set', component: SetContainer },
        //我的收货地址
        { path: '/mine/set/myAddress', component: MyAddressContainer },
        //编辑收货地址
        { path: '/mine/set/myAddress/editAddress', component: EditAddressContainer },
    ],
    linkActiveClass: 'van-tabbar-item--active'
})


export default router