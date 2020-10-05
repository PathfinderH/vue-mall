<template>
  <div class="search-container">
    <!-- <van-loading class="loading" v-show="loading"/> -->
      <van-sticky>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        shape="round"
        placeholder="请输入搜索关键词"
        background="#eeeeee"
        @input="onSearch"
        @cancel="onCancel"
      />
    </form>
      </van-sticky>
    <div class="search-found" v-show="hotSearch_flag">
      <h4>热门搜索</h4>
      <div class="hot-search">
        <van-tag
          round
          type="primary"
          size="medium"
          color="#DEE1E6"
          text-color="#999"
          v-for="(item, index) in hot_search"
          :key="index"
          @click="hotSearch($event)"
          >{{ item }}</van-tag
        >
      </div>
    </div>
    <div class="search-content">
      <van-card
        v-for="(item, index) in search_list"
        :key="index"
        :price="item.price"
        :origin-price="item.original_price"
        :title="item.title"
        :thumb="item.img_url"
        :thumb-link="'http://127.0.0.1:3000/#/home/product' + item.id"
      >
        <template #footer>
          <van-row align="center">
            <van-col span="8">{{ "快递:" + item.expressage }}</van-col>
            <van-col span="8">{{ item.people_buy + "人付款" }}</van-col>
            <van-col span="8">{{ item.ship_address }}</van-col>
          </van-row>
        </template>
      </van-card>
    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  data() {
    return {
      search:this.$route.params.search,//点击分类页商品传递搜索参数
      hotSearch_flag: true, //热门搜索显示隐藏
      value: "", //搜索框数据
      search_list: [], //搜索结果数据
      hot_search: [ //热门搜索
        "运动鞋",
        "彩妆",
        "杯",
        "电脑散热器",
        "生日礼物",
        "充电宝",
        "耳机",
        "窗帘",
      ],
    };
  },
created(){
  // 点击分类页中的商品自动搜索
  this.value = this.search;
  this.getSearchResult(this.value);
},

  methods: {
    //点击热门搜索标签
    hotSearch($event) {
      this.getSearchResult($event.currentTarget.innerHTML);
    },

    //热门搜索内容显示隐藏
    hotSearchFlag() {
      if (this.search_list.length == 0) {
        this.hotSearch_flag = true;
      } else {
        this.hotSearch_flag = false;
      }
    },

    //获取搜索结果数据
    getSearchResult(val) {
      if (val != "") {
        axios
          .get("http://localhost:3001/getSearch/" + val)
          .then((response) => {
            this.search_list = response.data;
            this.hotSearchFlag();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    //搜索框数值发生变化时
    onSearch(val) {
      this.getSearchResult(val);
    },

//点击取消
    onCancel() {
      this.$router.go(-1);
      this.hotSearchFlag();
    },
  },
};
</script>

<style lang="scss" scoped>


//搜索框样式
.van-search {
  border-bottom: 1px solid #e1e2e4;
}

//搜索发现
.search-found {
  padding: 0 15px;
  h4 {
    margin: 0;
    padding: 15px 0 10px 0;
    font-size: 15px;
  }
  .van-tag--primary {
    padding: 3px 10px;
    margin: 0 5px 10px 0;
  }
}

//搜索结果
.search-content .van-card__footer {
  text-align: left;
  padding: 15px 0 10px 0;
  font-size: 13px;
  color: #999;
}
.van-card {
  margin-top: 5px;
}
.van-card__price {
  color: #ff5000;
  font-size: 18px;
}
.van-card__origin-price {
  font-size: 13px;
}
.van-card__title {
  font-size: 15px;
  font-weight: bold;
  color: #4b566a;
}
</style>