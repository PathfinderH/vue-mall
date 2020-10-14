// 注册 vuex

import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex)

let car = JSON.parse(localStorage.getItem('car') || '[]')
let check_all = JSON.parse(localStorage.getItem('check_all') || false)
let isLogin = JSON.parse(localStorage.getItem('isLogin') || false)
let currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]')
let address = JSON.parse(localStorage.getItem('address') || '[]')

let shopcarOrBuyFlag = JSON.parse(localStorage.getItem('shopcarOrBuyFlag') || false)
let directBuyGoods = JSON.parse(localStorage.getItem('directBuyGoods') || '{}')

let store = new Vuex.Store({

    state: {
        car: car, //购物车数据
        check_all: check_all, //全选按钮状态
        isLogin: isLogin, //用户登录状态
        currentUser: currentUser, //当前用户信息
        address: address, //收货地址

        shopcarOrBuyFlag: shopcarOrBuyFlag, //判断用户提交订单时是从购物车提交还是直接购买
        directBuyGoods: directBuyGoods
    },

    mutations: {

        //将直接购买的商品id保存到localstore中
        saveDirectBuyGoodsId(state, info) {
            state.directBuyGoods = info
            localStorage.setItem('directBuyGoods', JSON.stringify(state.directBuyGoods))
        },

        //判断用户提交订单时是从购物车提交还是直接购买
        saveShopcarOrBuyFlag(state, flag) {
            state.shopcarOrBuyFlag = flag
            localStorage.setItem('shopcarOrBuyFlag', JSON.stringify(state.shopcarOrBuyFlag))
        },


        //新增用户收货地址信息
        saveAdress(state, info) {
            if (info.isDefault == true) {
                state.address.some((item) => {
                    if (item.isDefault == true) {
                        item.isDefault = false;
                        return true;
                    }
                })
            }
            state.address.push(info);
            localStorage.setItem('address', JSON.stringify(state.address))
        },

        //修改用户收货地址信息
        editAdress(state, info) {
            state.address.splice(info.id, 1, info);
            localStorage.setItem('address', JSON.stringify(state.address))
        },

        //删除用户收货地址信息
        deleteAdress(state, id) {
            state.address.splice(id, 1);
            localStorage.setItem('address', JSON.stringify(state.address))
        },

        //保存登录状态
        saveLogin(state) {
            state.isLogin = true;
            localStorage.setItem('isLogin', JSON.stringify(state.isLogin))
        },

        //保存用户信息
        currentUser(state, info) {
            state.currentUser.push(info);
            localStorage.setItem('currentUser', JSON.stringify(state.currentUser))
        },

        //点击加入购物车将商品信息保存到store中的car数组中
        addToCar(state, goodsInfo) {
            let flag = false;
            state.car.some(item => {
                if (item.id == goodsInfo.id) {
                    item.count += parseInt(goodsInfo.count);
                    flag = true;
                    return true;
                }
            })
            if (!flag) {
                state.car.push(goodsInfo);
            }
            localStorage.setItem('car', JSON.stringify(state.car))
        },

        //在购物车中修改商品数量时更新store中的值
        updateGoodsInfo(state, goodsinfo) {
            //修改购物车中商品的数量值
            state.car.some(item => {
                    if (item.id == goodsinfo.id) {
                        item.count = parseInt(goodsinfo.count)
                        return true
                    }
                })
                //修改完商品数量讲最新的数量保存的本地存储中
            localStorage.setItem('car', JSON.stringify(state.car))
        },

        //更新按钮状态
        updateGoodsSelected(state, info) {
            state.car.some(item => {
                if (item.id == info.id) {
                    item.selected = info.selected;
                    return true
                }
            })

            //如果所有按钮都为true状态则全选按钮也为true状态
            state.car.some(item => {
                if (item.selected == true) {
                    state.check_all = true;
                    return true
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        },

        //修改所有按钮状态
        updateAllSelected(state, flag) {
            state.car.forEach(item => {
                item.selected = flag;
            })
            localStorage.setItem('car', JSON.stringify(state.car))
            localStorage.setItem('check_all', JSON.stringify(state.check_all))
        },

        //当点击购物车选中按钮时遍历所有按钮来决定全选按钮是否选中
        getAllSelected_false(state) {

            state.car.some(item => {
                if (item.selected == false) {
                    state.check_all = false;
                    return false
                }
            })

            localStorage.setItem('check_all', JSON.stringify(state.check_all))
        },

        //删除购物车商品
        removeProduct(state, newCar) {
            state.car = newCar;
            localStorage.setItem('car', JSON.stringify(state.car))
        },

    },



    getters: {


        //获取购物车中所有商品数量
        getAllCount(state) {
            let sum = 0;
            state.car.forEach(item => {
                sum += item.count
            })
            return sum;
        },

        // 获取购物车中每个商品的数量
        getGoodsCount(state) {
            let o = {}
            state.car.forEach(item => {
                o[item.id] = item.count
            })
            return o;
        },

        // 获取购物车选择按钮的状态
        getGoodsSelected(state) {
            let o = {}
            state.car.forEach(item => {
                o[item.id] = item.selected
            })
            return o;
        },

        //计算购物车已经勾选的商品数量和总价
        getGoodsCountAndAmount(state) {
            let o = {
                count: 0,
                amount: 0
            }
            state.car.forEach(item => {
                if (item.selected) {
                    o.count += item.count
                    o.amount += item.price * item.count;
                }
            })
            return o;
        },


    }
})


export default store;