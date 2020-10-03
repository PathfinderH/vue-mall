<template>
  <div class="app-home">
    <!-- 顶部搜索框 -->

<div class="search-fixed">
  <!-- <van-sticky> -->

      <van-search
        class="home-search"
        background="#FF852A"
        placeholder="请输入搜索关键词"
        @focus="getFocus"
      />
     
<!-- </van-sticky> -->
</div>

    <!-- 轮播图 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>

    <!-- 宫格选项 -->
    <van-grid square clickable :column-num="5" :border="false" icon-size="35px">
      <van-grid-item
        :icon="item.icon_url"
        :text="item.name"
        :to="item.router_url"
        v-for="(item, index) in icons"
        :key="index"
      />
    </van-grid>

    <van-grid square clickable :column-num="5" :border="false" icon-size="35px">
      <van-grid-item
        :icon="item.icon_url2"
        :text="item.name2"
        :to="item.router_url2"
        v-for="(item, index) in icons"
        :key="index"
      />
    </van-grid>

    <!-- 中部content -->
    <div class="content" :style="{ height: 'scrollerWidth' }">
      <van-row>
        <van-col
          span="6"
          :style="{ height: van_col_hight }"
          v-for="(item, index) in content_list"
          :key="index"
        >
          <router-link :to="item.router_path" class="content_div">
            <div
              :style="{
                bottom: content_img_height,
                'padding-bottom': content_img_bottom,
              }"
            >
              <h4><img :src="item.textimg_url" /></h4>
              <p :style="{ color: item.text_color }">{{ item.text }}</p>
            </div>
            <img
              :src="item.url"
              :style="{
                height: content_img_height,
                bottom: content_img_bottom,
                'margin-left': content_img_margin,
              }"
            />
          </router-link>
        </van-col>
      </van-row>

      <van-row class="content_bottom">
        <van-col span="5"><h4>淘宝头条</h4></van-col>
        <van-col span="19">
          <p class="van-ellipsis">
            <span>摄影</span>专治镜头尴尬症，7个女生通用pose
          </p>
        </van-col>
      </van-row>
    </div>

    <!-- 商品列表信息 -->
    <div class="product_list">
      <van-divider
        :style="{
          color: '#FF4F00',
          borderColor: '#FF4F00',
          padding: '0 50px',
          'font-size': '13px',
        }"
        ><van-icon
          name="like"
          :style="{ 'font-size': '16px' }"
        />&nbsp;你可能还喜欢</van-divider
      >

      <van-row gutter="10">
        <van-col span="12" v-for="(item, index) in product_list" :key="index">
          <router-link :to="'/home/product' + item.id">
            <img :src="item.img_url" />
            <div class="product_text title">
              <span
                class="van-multi-ellipsis--l2"
                :style="{ 'font-size': product_list_fontsize }"
                >{{ item.title }}</span
              >
            </div>
            <div
              class="product_text"
              :style="{ 'font-size': product_list_fontsize }"
            >
              <!-- <span></span> -->
              <span class="price">￥{{ item.price }}</span>
              <span class="people_buy">{{ item.people_buy }}人已经购买</span>
            </div>
          </router-link>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Sticky } from 'vant';

Vue.use(Sticky);
import axios from "axios";
export default {
  data() {
    return {
      images: [], //轮播图数组
      content_list: [],
      product_list: [], //商品数组
      icons: [],
    };
  },
  created() {
    this.getSwipeImg();
    this.getContent();
    this.getProductList();
    this.getIcons();
  },
  mounted() {
    console.log(this.scrollerWidth);
  },
  methods: {
    getFocus() {
      this.$router.push("/search");
    },

    //获取轮播图
    getSwipeImg() {
      axios
        .get("http://localhost:3001/getSwipeImgs")
        .then((response) => {
          response.data.forEach((element) => {
            this.images.push(element);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getIcons() {
      axios
        .get("http://localhost:3001/getIcons")
        .then((response) => {
          response.data.forEach((element) => {
            this.icons.push(element);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 获取中部content数据
    getContent() {
      axios
        .get("http://localhost:3001/getContent")
        .then((response) => {
          response.data.forEach((element) => {
            this.content_list.push(element);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //获取底部product_list数据
    getProductList() {
      axios
        .get("http://localhost:3001/getProductList")
        .then((response) => {
          response.data.forEach((element) => {
            this.product_list.push(element);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    scrollerWidth() {
      return window.innerWidth + "px";
    },

    van_col_hight() {
      return window.innerWidth / 3 + "px";
    },
    content_img_height() {
      return window.innerWidth / 5.5 + "px";
    },
    content_img_margin() {
      return -window.innerWidth / 5 / 2.5 + "px";
    },
    content_img_bottom() {
      return window.innerWidth / 30 + "px";
    },
    product_list_fontsize() {
      return window.innerWidth * 0.0346 + "px";
    },
  },
};
</script>
<style>
@media screen and (min-width: 767px) {
  .app-home .van-grid-item__icon {
    font-size: 55px !important;
  }
}
/* .van-sticky{
  z-index: 9999;
} */



.home-search .van-search__content {
  background-color: #ff4e22;
  border-radius: 5px;
}
.home-search input::-webkit-input-placeholder {
  color: #F0E0DC !important;
}
</style>
<style lang="scss" scoped>
html,
body,
h4,
p,
span {
  margin: 0;
  padding: 0;
}
@media screen and (max-width: 376px) {
  .van-swipe {
    height: 120px;
  }
}
@media screen and (min-width: 767px) {
  .van-swipe {
    height: 246px;
  }
}
@media screen and (min-width: 1023px) {
  .van-swipe {
    height: 328px;
  }
}

.search-fixed{
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 9999;
}

//轮播图样式
.van-swipe {
  margin-top: 54px;
  min-height: 120px;
}
.van-swipe img {
  width: 100%;
  height: 100%;
}

//中部content样式
.content {
  background-color: #fff;
  margin: 10px;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-radius: 10px;
  overflow: hidden;
  .content_div {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
  }
  .content_div > img {
    position: absolute;
    left: 50%;
  }
  .content_div div {
    position: absolute;
    width: 100%;
    text-align: center;
  }
  .content_div div p {
    font-size: 13px;
  }
  .content_div div h4 img {
    height: 21px;
    position: absolute;
    top: -20px;
    left: 0;
    z-index: 99;
  }

  .content_bottom {
    padding: 5px 0 0 10px;
  }
  .content_bottom p {
    line-height: 23px;
    font-size: 14px;
    width: 250px;
  }
  .content_bottom p span {
    background-color: #feefec;
    color: #e8625b;
    border-radius: 5px;
    padding: 5px;
  }
}

//商品列表信息
.product_list {
  margin: 0 10px 50px 10px;
}
.product_list .van-col--12 {
  background: #fff;
  background-clip: content-box;
  margin-bottom: 10px;
}
.product_list .van-col--12 img {
  width: 100%;
}
.product_list .van-col--12 .product_text {
  color: black;
  padding: 10px 10px 0 10px;
  margin-bottom: 10px;
}
.product_list .van-col--12 .title {
  padding-bottom: 0;
  margin-bottom: 0;
}
.product_list .van-col--12 .product_text .price {
  color: #ff5500;
}
.product_list .van-col--12 .product_text .people_buy {
  color: #999999;
}
</style>