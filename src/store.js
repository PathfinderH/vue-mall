// 注册 vuex

import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex)

let car = JSON.parse(localStorage.getItem('car') || '[]')
let flag = JSON.parse(localStorage.getItem('flag') || false)

let store = new Vuex.Store({

    state: {
        car: car,
        flag: flag
    },

    mutations: {

        saveLogin(state) {
            state.flag = true;
            localStorage.setItem('flag', state.flag)
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
            localStorage.setItem('car', JSON.stringify(state.car))
        },

        //修改所有按钮状态
        updateAllSelected(state, flag) {
            state.car.forEach(item => {
                item.selected = flag;
            })
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