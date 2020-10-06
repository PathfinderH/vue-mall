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
    <van-swipe :autoplay="3000" :style="{height: scrollerWidth * 0.32 + 'px'}">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>

    <!-- 宫格导航 -->
    <div class="gird-content">
      <div class="radius-head"></div>
      <van-grid
        square
        clickable
        :column-num="5"
        :border="false"
        icon-size="35px"
      >
        <van-grid-item
          :icon="item.icon_url"
          :text="item.name"
          :to="item.router_url"
          v-for="(item, index) in icons"
          :key="index"
        />
      </van-grid>

      <van-grid
        square
        clickable
        :column-num="5"
        :border="false"
        icon-size="35px"
      >
        <van-grid-item
          :icon="item.icon_url2"
          :text="item.name2"
          :to="item.router_url2"
          v-for="(item, index) in icons"
          :key="index"
        />
      </van-grid>
    </div>


<!-- 推荐榜单 -->
<div class="recommend" >
  <h4 class="recommend_head">推荐榜单</h4>
    <van-row gutter="0"  type="flex" justify="center">
  <van-col span="8">
     <div
      :style="{
        height: scrollerWidth * 0.354 + 'px',
        width: scrollerWidth * 0.3 + 'px',
      }"
      class="vertical-swipe"
    >
      <div class="van-swipe-item recommend-left">
        <div class="head-img">
          <img
            src="http://localhost:3000/src/img/home_imgs/recommend/recommend_05.webp"
            :style="{
              height: scrollerWidth * 0.2 + 'px',
              width: scrollerWidth * 0.2 + 'px',
            }"
          />
        </div>
        <div
          class="text"
          :style="{
            height: scrollerWidth * 0.124 + 'px',
            'padding-bottom': scrollerWidth * 0.187 + 'px',
          }"
        >
          <p class="popular"><span>人气榜</span></p>
          <p :style="{ 'padding-top': scrollerWidth * 0.04 + 'px'}">电脑DIY配件榜</p>
          <span>卖爆3132件</span>
        </div>
      </div>
    </div>
  </van-col>
  <van-col span="8">
     <van-swipe
      :style="{
        height: scrollerWidth * 0.354 + 'px',
        width: scrollerWidth * 0.3 + 'px',
      }"
      vertical
      class="vertical-swipe"
      :touchable="false"
      :autoplay="3000"
      :duration="1000"
      :show-indicators="false"
    >
      <van-swipe-item v-for="(item, index) in vertical_swipe" :key="index">
        <div class="head-img">
          <img
            :src="item.img_url"
            :style="{
              height: scrollerWidth * 0.2 + 'px',
              width: scrollerWidth * 0.2 + 'px',
            }"
          />
        </div>
        <div
          class="text"
          :style="{
            height: scrollerWidth * 0.124 + 'px',
            'padding-bottom': scrollerWidth * 0.187 + 'px',
          }"
        >
          <p class="popular"><span>人气榜</span></p>
          <p :style="{ 'padding-top': scrollerWidth * 0.04 + 'px'}">{{item.title}}</p>
          <span>{{item.text}}</span>
        </div>
      </van-swipe-item>
    </van-swipe>
  </van-col>
 <van-col span="8">
     <div
      :style="{
        height: scrollerWidth * 0.354 + 'px',
        width: scrollerWidth * 0.3 + 'px',
      }"
      class="vertical-swipe"
    >
      <div class="van-swipe-item recommend-right">
        <div class="head-img">
          <img
            src="http://localhost:3000/src/img/home_imgs/recommend/recommend_04.webp"
            :style="{
              height: scrollerWidth * 0.2 + 'px',
              width: scrollerWidth * 0.2 + 'px',
            }"
          />
        </div>
        <div
          class="text"
          :style="{
            height: scrollerWidth * 0.124 + 'px',
            'padding-bottom': scrollerWidth * 0.187 + 'px',
          }"
        >
          <p class="popular"><span>人气榜</span></p>
          <p :style="{ 'padding-top': scrollerWidth * 0.04 + 'px'}">人气智能电视榜</p>
          <span>卖爆9.1万件</span>
        </div>
      </div>
    </div>
  </van-col>
</van-row>
</div>




<!-- 中部田字宫格 -->
    <div class="content-gird">
      <van-grid :column-num="2">
        <van-grid-item
          to="/test"
          v-for="(item, index) in content_gird_lsit"
          :key="index"
        >
          <div class="first-text">
            <span :style="{ 'font-size': scrollerWidth * 0.0373 + 'px' }">{{
              item.title
            }}</span>
            <span :style="{ 'font-size': scrollerWidth * 0.03 + 'px' }">{{
              item.title_badge
            }}</span>
          </div>
          <p
            class="buy-num"
            :style="{ 'font-size': scrollerWidth * 0.03 + 'px' }"
          >
            {{ item.title_two }}
          </p>
          <div class="img-wrapper">
            <span
              ><img
                :src="item.img_one"
                :style="{ width: scrollerWidth * 0.186 + 'px' }"
            /></span>
            <span
              ><img
                :src="item.img_two"
                :style="{ width: scrollerWidth * 0.186 + 'px' }"
            /></span>
          </div>
        </van-grid-item>
      </van-grid>

      <van-grid :column-num="2">
        <van-grid-item
          to="/test"
          v-for="(item, index) in content_gird_lsit"
          :key="index"
        >
          <div class="first-text">
            <span :style="{ 'font-size': scrollerWidth * 0.0373 + 'px' }">{{
              item.title2
            }}</span>
            <span :style="{ 'font-size': scrollerWidth * 0.03 + 'px' }">{{
              item.title_badge2
            }}</span>
          </div>
          <p
            class="buy-num"
            :style="{ 'font-size': scrollerWidth * 0.03 + 'px' }"
          >
            {{ item.title_two2 }}
          </p>
          <div class="img-wrapper">
            <span
              ><img
                :src="item.img_one2"
                :style="{ width: scrollerWidth * 0.186 + 'px' }"
            /></span>
            <span
              ><img
                :src="item.img_two2"
                :style="{ width: scrollerWidth * 0.186 + 'px' }"
            /></span>
          </div>
        </van-grid-item>
      </van-grid>
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

      <van-row>
        <van-col span="12" v-for="(item, index) in product_list" :key="index">
          <router-link :to="'/home/product' + item.id">
            <img :src="item.img_url" />
            <div class="product_text title">
              <span
                class="van-multi-ellipsis--l2"
                :style="{ 'font-size': scrollerWidth * 0.0346 + 'px' }"
                >{{ item.title }}</span
              >
            </div>
            <div
              class="product_text"
              :style="{ 'font-size': scrollerWidth * 0.0346 + 'px' }"
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

export default {
  data() {
    return {
      loading: true,
      scrollerWidth: window.innerWidth,//当前设备屏幕宽
      images: [], //轮播图数组
       vertical_swipe:[
        {
          img_url:'http://localhost:3000/src/img/home_imgs/recommend/recommend_01.webp',
          title:'休闲饼干零食榜',
          text:'卖爆9.1万件'
        },
        {
          img_url:'http://localhost:3000/src/img/home_imgs/recommend/recommend_02.webp',
          title:'贴合水润面膜棒',
          text:'卖爆2.6万件'
        },
         {
          img_url:'http://localhost:3000/src/img/home_imgs/recommend/recommend_03.webp',
          title:'滋润营养乳液榜',
          text:'卖爆5752万件'
        }
      ],

      content_gird_lsit: [
        {
          title: "电脑DIY配件榜",
          title_badge: "人气榜",
          title_two: "卖爆3318件",
          img_one: "http://localhost:3000/src/img/home_imgs/01.webp",
          img_two: "http://localhost:3000/src/img/home_imgs/02.webp",

          title2: "人气轻薄本榜",
          title_badge2: "趋势榜",
          title_two2: "本周趋势上升59%",
          img_one2: "http://localhost:3000/src/img/home_imgs/05.webp",
          img_two2: "http://localhost:3000/src/img/home_imgs/06.webp",
        },
        {
          title: "乐享鲜汤炖锅榜",
          title_badge: "人气榜",
          title_two: "卖爆5097件",
          img_one: "http://localhost:3000/src/img/home_imgs/03.webp",
          img_two: "http://localhost:3000/src/img/home_imgs/04.webp",

          title2: "时尚保鲜冰箱榜",
          title_badge2: "趋势榜",
          title_two2: "本周趋势上升71%",
          img_one2: "http://localhost:3000/src/img/home_imgs/07.webp",
          img_two2: "http://localhost:3000/src/img/home_imgs/08.webp",
        },
      ],
      product_list: [], //商品数组
      icons: [],//导航图标
    };
  },
  created() {
    this.getSwipeImg();
    this.getProductList();
    this.getIcons();
  },
mounted(){
  this.loading = false;
},
  methods: {
    getFocus() {
      this.$router.push("/search");
       
    },

    //获取轮播图
    getSwipeImg() {
      this.axios
        .get("/getSwipeImgs")
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
      this.axios
        .get("/getIcons")
        .then((response) => {
          response.data.forEach((element) => {
            this.icons.push(element);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //获取底部product_list数据
    getProductList() {
      this.axios
        .get("/getProductList")
        .then((response) => {
          this.product_list = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style>
@media screen and (min-width: 767px) {
  .app-home .van-grid-item__icon {
    font-size: 55px !important;
  }
  .app-home .van-grid-item__text {
    font-size: 20px !important;
  }
 
  .product_list .van-col--12 .product_text {
    padding: 20px 17px 0 17px !important;
    margin-bottom: 20px !important;
  }
   .product_list .van-col--12 .title {
   margin-bottom: 0px !important;
  }
}

/* 轮播索引样式 */
.van-swipe__indicators {
  bottom: 15px;
}
.van-swipe__indicator {
  width: 8px;
  height: 8px;
}

/* 搜索框 */
.home-search .van-search__content {
  background-color: #ff4e22;
  border-radius: 5px;
}
.home-search input::-webkit-input-placeholder {
  color: #f0e0dc !important;
}



/* content-gird */
.content-gird {
  margin: 3%;
  border-radius: 10px;
  overflow: hidden;
}
.content-gird .van-grid-item__content {
  padding: 0;
  display: block;
}
.buy-num {
  font-size: 13px;
  padding: 0 10px !important;
  margin: 0;
  color: #999;
}

/* 轮播图上分圆弧样式 */
.gird-content {
  position: relative;
  margin-bottom: 3%;
}
.radius-head {
  position: absolute;
  z-index: 9;
  height: 10px;
  width: 100%;
  top: -9px;
  background-image: url(https://gw.alicdn.com/tfs/TB1vMMwChTpK1RjSZFMXXbG_VXa-1125-30.png);
  background-size: cover;
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

@media screen and (min-width: 767px) {
  //竖向轮播
  .text {
  p{
    font-size: 27px !important;
  }
  span{
    font-size: 20px !important;
    
  }
  .popular{
    span{
      margin-right: -39px !important;
    }
  }
}
}


//搜索框固定
.search-fixed {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 99;
}

//轮播图样式
.van-swipe {
  margin-top: 54px;
  // min-height: 120px;
}
.van-swipe img {
  width: 100%;
  height: 100%;
}



//竖轮播图
.recommend{
  padding: 0 2%;
  .recommend_head{
    padding: 0 2%;
  }
}
.vertical-swipe {

  border-radius: 5%;
  overflow: hidden;
  text-align: center;
  margin: 0 auto;
   margin-top: 10%;
  .van-swipe-item{
  background-image: -webkit-linear-gradient(right, #ff6600 0%, #ff9b00 100%);
  }
  .recommend-right,
  .recommend-left
  {
    background-image: -webkit-linear-gradient(right, #E0A26C 0%, #E8B58B 100%);
  }
  .head-img {
    background-color: #fff;
  }
  .text {
    .popular {
      position: relative;
      padding: 0;
      span {
        position: absolute;
        background-color: #fff;
        color: #ff6c00;
        border-radius: 200px;
        padding: 2px 8px;
        border: 1px solid #ff6f01;
        right: 50%;
        margin-right: -26px;
        bottom: 50%;
        margin-bottom: -11px;
      }
    }

    p {
      font-size: 13.5px;
      color: #fff;
    }
    span {
      font-size: 12px;
      color: #F6E3D2;

    }
  }
}








//content-gird
.content-gird {
    .van-hairline--top::after {
    border-top-width: 0px;
}
  .first-text {
    padding: 10px 10px 0 10px;
    span:nth-child(1) {
      font-size: 14px;
      font-weight: bold;
    }
    span:nth-child(2) {
      font-size: 13px;
      color: #ab813a;
      background-color: #f9f5ee;
      border-radius: 10px;
      padding: 0 5px;
    }
  }
  .img-wrapper {
    text-align: center;
  }
}

//商品列表信息
.product_list {
  margin: 0 3% 50px 3%;
}
.product_list .van-col--12 {
  background: #fff;
  background-clip: content-box;
  margin-bottom: 2%;
  border-radius: 3%;
  overflow: hidden;
  width: 49% !important;
}
.product_list .van-col--12:nth-child(2n + 1) {
  margin-right: 1%;
}
.product_list .van-col--12:nth-child(2n) {
  margin-left: 1%;
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