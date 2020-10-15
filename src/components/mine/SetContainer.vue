<template>
  <div class="set" :style="{ height: scrollerHeight + 'px' }">
    <!-- 顶部导航栏 -->
    <div class="nav">
      <van-nav-bar
        title="设置"
        :border="false"
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <template #left>
          <van-icon name="arrow-left" size="20" color="#999" />
        </template>
        <template #right>
          <van-icon name="qr" size="24" color="#999" />
        </template>
      </van-nav-bar>
    </div>

    <div class="head">
      <van-cell
        :title="'用户：' + $store.state.currentUser[0].username"
        icon="http://gw.alicdn.com/sns_logo/i4/O1CN01RQD3d21PgVCYh3yBd_!!0-mytaobao.jpg_100x100q90_.webp"
      >
      </van-cell>
    </div>

    <div class="cell">
      <van-cell
        :title="item.title"
        is-link
        :to="item.to"
        v-for="(item, index) in cell_list"
        :key="index"
      />
      <van-cell title="退出登录" is-link class="log-out" @click="logOut"/>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      scrollerHeight: window.innerHeight,
      cell_list: [
        { title: "我的收货地址", to: "/mine/set/myAddress" },
        { title: "账户与安全", to: "/mine/set/account" },
        { title: "支付设置", to: "/mine/set/paySet" },
        { title: "通用", to: "/mine/set/general" },
        { title: "问题反馈", to: "/mine/set/feedback " },
        { title: "关于Vue-Mall", to: "/mine/set/about" },
      ],
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push("/mine");
    },
    onClickRight() {
      // Toast.
    },

    logOut() {
      localStorage.removeItem("isLogin");
      localStorage.removeItem("currentUser");
      this.$router.push("/login");
    },

    nullClick() {
      Toast("暂无后续逻辑~");
    },
  },
};
</script>

<style lang="scss" scoped>
.set {
  position: relative;
  z-index: 99;
  background-color: #f4f4f4;
  // 顶部导航栏
  .nav .van-nav-bar {
    background-color: #f4f4f4;
  }
  //   头像部分
  .head {
    .custom-title {
      margin-right: 4px;
      vertical-align: middle;
    }

    .search-icon {
      font-size: 16px;
    }
    .van-cell {
      padding: 10px 16px;
      line-height: 60px;
      border-bottom: 1px solid #e7eaed;
      .van-cell__left-icon {
        font-size: 60px;
        margin-right: 20px;
      }
      .van-icon__image {
        border-radius: 50%;
      }
    }
  }
  //单元格标签部分
  .cell {
    .van-cell:nth-child(-n + 3) {
      margin-bottom: 10px;
    }
    .log-out {
      text-align: center;
      margin-top: 10px;
    }
  }
}
</style>