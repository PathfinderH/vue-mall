<template>
  <div
    class="mine-container"
    :style="{ width: scrollerWidth + 'px' }"
    v-show="$store.state.isLogin"
  >
    <div class="header">
      <div class="portrait">
        <van-row>
          <van-col span="6"
            ><van-image
              cover
              round
              width="4rem"
              height="4rem"
              src="http://gw.alicdn.com/sns_logo/i4/O1CN01RQD3d21PgVCYh3yBd_!!0-mytaobao.jpg_100x100q90_.webp"
          /></van-col>
          <van-col span="12"
            ><h3>用户：{{ $store.state.currentUser[0].username }}</h3></van-col
          >
          <van-col span="6" class="set"
            ><h3>
              <router-link to="/mine/set"
                ><van-icon name="setting-o"
              /></router-link></h3
          ></van-col>
        </van-row>

        <van-row class="DFrameLayout">
          <van-col span="6">
            <div>111</div>
            <div>收藏夹</div>
          </van-col>
          <van-col span="6">
            <div>211</div>
            <div>足迹</div>
          </van-col>
          <van-col span="6">
            <div>1231</div>
            <div>我的评价</div>
          </van-col>
          <van-col span="6">
            <div>0</div>
            <div>红包</div>
          </van-col>
        </van-row>
      </div>
    </div>

    <!-- 我的订单 -->

    <div class="my-order">
      <div class="head">
        <van-row>
          <van-col span="12"><span>我的订单</span></van-col>
          <van-col
            span="12"
            class="all-order"
            @click="$router.push('/mine/orderForm')"
            ><span>查看全部订单</span></van-col
          >
        </van-row>
      </div>
      <div class="content">
        <van-grid :column-num="5" :border="false">
          <van-grid-item
            v-for="(item, index) in order_list"
            :key="index"
            :icon="item.url"
            :text="item.text"
            :to="{ name: 'orderForm', params: { i: index + 1 } }"
          />
        </van-grid>
      </div>
    </div>

    <!-- 必备工具 -->
    <div class="my-order">
      <div class="head">
        <van-row>
          <van-col span="12"><span>必备工具</span></van-col>
          <van-col span="12" class="all-order"
            ><span>查看全部工具</span></van-col
          >
        </van-row>
      </div>
      <div class="content tool">
        <van-grid :column-num="4" :border="false">
          <van-grid-item
            v-for="(item, index) in tool_list"
            :key="index"
            :icon="item.url"
            :text="item.text"
            @click="iconClick"
          />
        </van-grid>
        <van-grid :column-num="4" :border="false">
          <van-grid-item
            v-for="(item, index) in tool_list"
            :key="index"
            :icon="item.url2"
            :text="item.text2"
            @click="iconClick"
          />
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
import info from "../assets/js/info.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      scrollerWidth: window.innerWidth,
      order_list: info.mine_order_list,
      tool_list: info.mine_tool_list,
    };
  },
  created() {
    if (this.$store.state.isLogin == false) {
      this.$router.push("/login");
    }
  },
  methods: {
    iconClick() {
      Toast("暂无后续逻辑~");
    },
  },
};
</script>

<style lang="scss" scoped>
// 头部
.header {
  background-image: -webkit-linear-gradient(right, #ff5000 0%, #ff8400 100%);
  .portrait {
    padding-top: 30px;
    .van-image {
      border: 1px solid #fff;
    }
  }
  .van-row {
    text-align: center;
    h3 {
      color: #fff;
    }
    .set {
      text-align: right;
      padding: 4px 20px 0 0;
      a {
        color: #fff;
      }
    }
  }
  .DFrameLayout {
    color: #fff;
    font-size: 10px;
    div {
      padding: 5px 0;
    }
  }
}

//我的订单
.my-order {
  background: #fff;
  border-radius: 12px;
  margin: 12px;
  .head {
    height: 38px;
    border-bottom: 1px solid #f1f3f4;
    font-size: 14px;
    font-weight: bold;
    line-height: 38px;
    padding: 0 10px 0 10px;
    .van-row {
      text-align: left;
      .all-order {
        text-align: right;
        color: #999;
        font-size: 12px;
        font-weight: 100;
      }
    }
  }
  .content {
    height: 76px;
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    .van-grid {
      height: 100%;
    }
    .van-grid-item {
      height: 100%;
    }
  }
}

//必备工具
.tool {
  height: 152px !important;
  .van-grid {
    height: 50% !important;
  }
}
</style>