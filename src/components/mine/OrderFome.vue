<template>
  <div>
    <van-tabs
      v-model="active"
      color="#FF5000"
      title-active-color="#FF5000"
    >
           <van-search
          v-model="value"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @clear="onClear"
          shape="round"
        >
          <template #action>
            <van-button round color="#FF5000" @click="onSearch" size="small"
              >搜索</van-button
            >
          </template>
        </van-search>
      <van-tab title="全部">
              <div class="null-order" v-if="orderFormList.length == 0">
              <img src="/src/assets/img/mine/order.png">
              <p>您还没有相关订单</p>
              <span>去看看其他想买的</span>
             <div><van-button round @click="$router.push('/home')">随便逛逛</van-button></div>
        </div>

        <div class="order-card">
          <van-card
            v-for="(item, index) in orderFormList"
            :key="index"
            :num="$store.getters.getOrderFormCount[item.index]"
            :price="item.price"
            :title="item.title"
            :thumb="item.img_url"
          >
            <template #footer>
              <div class="total-price">
                总价￥{{
                  item.price * 100 * $store.getters.getOrderFormCount[item.index] / 100
                }}
              </div>
              <van-button round size="small" @click="cardBtn">延长收货</van-button>
              <van-button round size="small" @click="cardBtn">查看物流</van-button>
              <van-button round size="small" @click="cardBtn" class="confirm-btn"
                >确认收货</van-button
              >
            </template>
          </van-card>
        </div>
      </van-tab>
      <van-tab :title="item" v-for="(item,index) in ['待付款','待发货','待收货','待评价']" :key="index">

          <div class="null-order">
              <img src="/src/assets/img/mine/order.png">
              <p>您还没有相关订单</p>
              <span>去看看其他想买的</span>
             <div><van-button round @click="$router.push('/home')">随便逛逛</van-button></div>
          </div>

      </van-tab>

    </van-tabs>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      active: this.$route.params.i || 0, //顶部标签栏

      orderFormList: [], //订单列表

      value: "", // 搜索框值
    };
  },
  created() {

    this.$store.commit("addIndexOrderForm");
    this.getOrderForm();
    console.log(this.orderFormList);
  },

  methods: {
    //获取订单列表
    getOrderForm() {
      let index = 0;
      if (this.$store.state.orderForm.length == 0) return;

      this.$store.state.orderForm.forEach((item) => {
        this.axios
          .get("/getShopcar/" + item.id)
          .then((response) => {
            response.data[0].index = index;
            index += 1;
            this.orderFormList.unshift(response.data[0]);
          })
          .catch((error) => {
            Toast.fail("获取数据失败");
            console.log(error);
          });
      });
    },

    //搜索订单
    query(key) {
      return this.orderFormList.filter((item) => {
        if (item.title.includes(key)) {
          return item;
        }
      });
    },

    onSearch() {
      this.orderFormList = this.query(this.value);
    },
    //清除搜索框后还原初始订单列表
    onClear() {
      this.orderFormList = [];
      this.getOrderForm();
    },

    cardBtn() {
      Toast("暂无后续逻辑~");
    },
  },
};
</script>

<style lang="scss" scoped>
.order-card {
  margin-bottom: 60px;
  .van-card {
    margin: 10px;
    border-radius: 10px;
  }
  .confirm-btn {
    color: #ff5000;
    border-color: #ff5000;
  }
  .van-button--small {
    height: 28px;
  }
}

.total-price {
  padding-bottom: 20px;
}

.van-search .van-button--small {
  font-size: 14px;
  padding: 0 30px;
  font-weight: bold;
}


.null-order{
    text-align: center;
    padding-top: 30%;
    img{
        width: 82px;
    }
    p{
        margin: 0;
        padding: 5px 0;
    }
    span{
        color: #999;
        font-size: 13px;
    }
    .van-button{
        height: 35px;
        padding: 5px 25px;
        background-image: -webkit-linear-gradient(right, #ff5000 0%, #ff8400 100%);
        margin-top: 30px;
    .van-button__text{
color: #fff;
    }
    }
}
</style>