import VueRouter from 'vue-router'

//导入tabbar路由组件
import HomeContainer from '../src/views/HomeContainer.vue'
import ClassifyContainer from '../src/views/ClassifyContainer.vue'
import SearchContainer from '../src/views/SearchContainer.vue'
import ShopcarContainer from '../src/views/ShopcarContainer.vue'
import MineContainer from '../src/views/MineContainer.vue'

//导入商品详情页面路由组件
import ProductPetails from './components/product/ProductPetails.vue'

//导入数码产品页面路由组件
import DigitalProductContainer from './components/home/DigitalProductContainer.vue'

//登录注册组件
import LoginContainer from './components/register&login/LoginContainer.vue'
import RegisterContainer from './components/register&login/RegisterContainer.vue'

//个人页面 设置 组件
import SetContainer from './components/mine/SetContainer.vue'
//个人页面 我的收货地址 组件
import MyAddressContainer from './components/mine/MyAddressContainer.vue'

//订单结算页面
import Settlement from './components/product/Settlement.vue'

//我的订单页面
import OrderForm from './components/mine/OrderFome.vue'

// 创建路由对象
const router = new VueRouter({
    routes: [ // 配置路由规则
        // tabbar路由
        { path: '/', redirect: '/home' },
        { path: '/home', component: HomeContainer },
        { path: '/classify', component: ClassifyContainer, },
        { path: '/search', name: 'search', component: SearchContainer },
        { path: '/shopcar', component: ShopcarContainer },
        { path: '/mine', component: MineContainer, },

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

        //结算页面
        { path: '/shopcar/settlement', component: Settlement },

        //订单页面
        { path: '/mine/orderForm', name: 'orderForm', component: OrderForm },

    ],
    linkActiveClass: 'van-tabbar-item--active',

})



router.beforeEach((to, from, next) => {

    const isLogin = window.localStorage.getItem('isLogin')
    if (isLogin) return next()
    else {
        if (to.path === '/shopcar' || to.path === '/mine') {
            next('/login')
        }
        next();
    }

})

export default router