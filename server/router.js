//路由模块

const express = require('express');
const service = require('./service.js');
const router = express.Router();

//轮播图
router.get('/getSwipeImgs', service.getSwipeImgs);
//主页icon
router.get('/getIcons', service.allIcons);
//主页商品列表
router.get('/getProductList', service.allProductList);
//获取商品详情
router.get('/allProductList/product/:id', service.getProduct);
//获取商品详情介绍图
router.get('/allProductList/getProduct/:id', service.getProductImg);
//获取购物车信息
router.get('/getShopcar/:id', service.getShopcar);
//搜索结果信息
router.get('/getSearch/:info', service.getSearch);
//注册账号
router.post('/register', service.register);
//注册账号
router.post('/login', service.login);
//获取用户收货地址
router.post('/userAdress', service.userAdress);
module.exports = router;