<template>
  <div class="mine-container" :style="{ width: scrollerWidth }" v-show="$store.state.flag">
    <div class="header" >
      <div class="portrait">
        <van-row>
          <van-col span="6"
            ><van-image
            @click="$router.push('/login')"
              cover
              round
              width="4rem"
              height="4rem"
              src="http://gw.alicdn.com/sns_logo/i4/O1CN01RQD3d21PgVCYh3yBd_!!0-mytaobao.jpg_100x100q90_.webp"
          /></van-col>
          <van-col span="12"><h3>怎么始终牵挂丶</h3></van-col>
          <van-col span="6" class="set"
            ><h3><van-icon name="setting-o" /></h3
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
            <div>1231</div>
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
            <van-col span="12" class="all-order"
              ><span>查看全部订单</span></van-col
            >
          </van-row>
        </div>
        <div class="content">
          <van-grid :column-num="5" :border="false">
            <van-grid-item
              v-for="(item, index) in  order_list"
              :key="index"
              :icon="item.url"
              :text="item.text"
              to="/test"
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
              to="/test"
            />
          </van-grid>
          <van-grid :column-num="4" :border="false">
            <van-grid-item
              v-for="(item, index) in tool_list"
              :key="index"
              :icon="item.url2"
              :text="item.text2"
              to="/test"
            />
          </van-grid>
        </div>
      </div>





  </div>
</template>

<script>

import axios from "axios";

export default {
  data() {
    return {
      order_list: [
        {
          url: "http://127.0.0.1:3000/src/img/mine/01.webp",
          text: "待付款",
        },
        {
          url: "http://127.0.0.1:3000/src/img/mine/02.webp",
          text: "待发货",
        },
        {
          url: "http://127.0.0.1:3000/src/img/mine/03.webp",
          text: "待收货",
        },
        {
          url: "http://127.0.0.1:3000/src/img/mine/04.webp",
          text: "评价",
        },
        {
          url: "http://127.0.0.1:3000/src/img/mine/05.webp",
          text: "退款/售后",
        },
      ],
      tool_list: [
        {
          url: "http://127.0.0.1:3000/src/img/mine/tool_01.webp",
          text: "每日返现",
          url2: "http://127.0.0.1:3000/src/img/mine/tool_05.webp",
          text2: "花呗",
        },
         {
          url: "http://127.0.0.1:3000/src/img/mine/tool_02.webp",
          text: "领券中心",
          url2: "http://127.0.0.1:3000/src/img/mine/tool_06.webp",
          text2: "我的快递",
        },
        {
          url: "http://127.0.0.1:3000/src/img/mine/tool_03.webp",
          text: "闲置换钱",
          url2: "http://127.0.0.1:3000/src/img/mine/tool_07.webp",
          text2: "我的评价",
        },
         {
          url: "http://127.0.0.1:3000/src/img/mine/tool_04.webp",
          text: "客服小蜜",
          url2: "http://127.0.0.1:3000/src/img/mine/tool_08.webp",
          text2: "主题换肤",
        },
      ],
    };
  },
  created() {
    if(this.$store.state.flag == false){
      this.$router.push('/login')
    }
  },

  methods: {},
  computed: {
    scrollerWidth() {
      return window.innerWidth + "px";
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
  .van-grid{
    height: 100%;

  }
  .van-grid-item{
    height: 100%;
    
  }
  }
}

//必备工具
.tool{
  height: 152px !important;
  .van-grid{
    height: 50% !important;
  }
}


</style>