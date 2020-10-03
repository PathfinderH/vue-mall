<template>
  <div class="app-container">

    <!-- 路由router-view区域 -->
    <transition mode="out-in">
        <router-view></router-view>
    </transition>

    <!-- 底部tabbar区域 -->
    <van-tabbar route active-color="#FF5000">
      <van-tabbar-item replace to="/home" icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item replace to="/classify" icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item replace to="/search" icon="search">搜索</van-tabbar-item>
      <van-tabbar-item replace to="/shopcar" :badge=$store.getters.getAllCount icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item replace to="/mine" icon="manager-o">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>


export default {
  
};
</script>


<style lang="scss" scoped>
//动画样式
.v-enter{
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to{
  opacity: 0;
  transform: translateX(-100%);
}
.v-enter-active,
.v-leave-active{
  transition: all 0.1s ease;
}

.app-container{
  overflow-x: hidden;
}
//底部标签栏样式
.van-hairline--top-bottom {
  box-shadow: 0px -1px 30px 0px lightgray;
}

  .van-tabbar--fixed{
    bottom: -1px;
  }

</style>
