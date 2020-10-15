<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar
      class="nav-bar"
      left-text="确认订单"
      left-arrow
      @click-left="$router.go(-1)"
    />

    <!-- 地址栏 -->
    <div class="address" @click="$router.push('/mine/set/myAddress')">
      <div class="item left">
        <img src="/src/assets/img/shopcar/address.webp" />
      </div>
      <div class="item mid">
        <div v-show="!isAddress" class="default-address">
          <p>
            {{ defaultAddress.name }} <span>{{ defaultAddress.tel }}</span>
          </p>
          <p>{{ defaultAddress.address }}</p>
          <p>收货不便时，可选择暂存服务</p>
        </div>
        <p v-show="isAddress" class="add-address">
          暂无默认收货地址，点击添加~
        </p>
      </div>
      <div class="item right"><van-icon name="arrow" size="18px" /></div>
    </div>

    <!-- 结算商品 -->
    <div v-if="$store.state.shopcarOrBuyFlag">
      <van-card
        v-for="(item, index) in settlementList"
        :key="index"
        :num="$store.getters.getGoodsCount[item.id]"
        :price="item.price"
        :title="item.title"
        :thumb="item.img_url"
      >
        <template #footer>
          <!-- 从购物车结算 -->
          <p>
            <span>共{{ $store.getters.getGoodsCount[item.id] }}件</span
            ><span>小计：</span
            ><span
              >￥{{
                (item.price * 100 * $store.getters.getGoodsCount[item.id]) / 100
              }}</span
            >
          </p>
        </template>
      </van-card>
    </div>

    <div v-if="!$store.state.shopcarOrBuyFlag">
      <!-- 直接购买结算 -->
      <van-card
        v-for="(item, index) in settlementList"
        :key="index"
        :num="$store.state.directBuyGoods.count"
        :price="item.price"
        :title="item.title"
        :thumb="item.img_url"
      >
        <template #footer>
          <p>
            <span>共{{ $store.state.directBuyGoods.count }}件</span
            ><span>小计：</span
            ><span>￥{{ $store.state.directBuyGoods.count * price }}</span>
          </p>
        </template>
      </van-card>
    </div>

    <!-- 底部提交订单(从购物车结算) -->
    <div v-if="$store.state.shopcarOrBuyFlag">
      <van-submit-bar
        :price="$store.getters.getGoodsCountAndAmount.amount"
        button-text="提交订单"
        @submit="onSubmit"
      >
        <template #default>
          <span class="total"
            >共记{{ $store.getters.getGoodsCountAndAmount.count }}件</span
          >
        </template>
      </van-submit-bar>
    </div>

    <!-- (直接购买结算) -->
    <div v-if="!$store.state.shopcarOrBuyFlag">
      <van-submit-bar
        :price="price * $store.state.directBuyGoods.count * 100"
        button-text="提交订单"
        @submit="onSubmitBuy"
      >
        <template #default>
          <span class="total"
            >共记{{ $store.state.directBuyGoods.count }}件</span
          >
        </template>
      </van-submit-bar>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      settlementList: [], //购买的商品
      defaultAddress: {},
      isAddress: false,
      price: "",
    };
  },
  created() {
    this.getSettlement();
    this.getAddress();
    this.ifAddress();
  },
  methods: {
    //从购物车结算
    onSubmit() {
      if (this.isAddress) return Toast.fail("请选择默认收货地址");
      this.$store.state.car.forEach((element) => {
        if (element.selected == true) {
          this.$store.commit("saveOrderForm", element);
        }
      });
      let newCar = [];
      this.$store.state.car.forEach((element) => {
        if (element.selected == false) {
          newCar.unshift(element);
        }
        return newCar;
      });

      this.$store.commit("removeProduct", newCar);

      Toast.success("购买成功~");

      this.$router.push("/mine/orderForm");
    },
    //直接购买
    onSubmitBuy() {
      if (this.isAddress) return Toast.fail("请选择默认收货地址");
      this.$store.commit("saveOrderForm", this.$store.state.directBuyGoods);
      Toast.success("购买成功~");

      this.getSettlement()
      this.$router.push("/mine/orderForm");
    },
    //判断是否有默认地址
    ifAddress() {
      if (Object.values(this.defaultAddress).length == 0) {
        this.isAddress = true;
      } else {
        this.isAddress = false;
      }
    },

    //获取购买商品数据
    getSettlement() {
      this.$store.state.car.forEach((element) => {
        if (element.selected == true) {
          this.settlementList.push(element);
        }
      });

      let idArr = [];
      if (this.$store.state.shopcarOrBuyFlag) {
        this.settlementList.forEach((item) => {
          idArr.push(item.id);
          return idArr;
        });
      } else {
        idArr.push(this.$store.state.directBuyGoods.id);
      }

      this.axios
        .get("/getShopcar/" + idArr.join(","))
        .then((response) => {
          this.settlementList = response.data;
          this.price = response.data[0].price;
        })
        .catch((error) => {
          Toast.fail("获取数据失败");
          console.log(error);
        });
    },

    //获取默认地址
    getAddress() {
      let addressArr = [];
      addressArr = JSON.parse(localStorage.getItem("address") || "[]");

      if (addressArr.length == 0) return;
      addressArr.some((item) => {
        if (item.isDefault == true) {
          this.defaultAddress = item;
          return true;
        }
      });
    },
  },
};
</script>
<style>
/* 头部导航 */
.nav-bar .van-nav-bar__text,
.nav-bar .van-icon {
  color: #000;
  font-size: 16px;
}
.nav-bar .van-icon {
  font-size: 20px;
}
</style>
<style lang="scss" scoped>
// 底部提交订单
.nav-bar {
  background-color: #f4f4f4;
}
// 地址栏
.address {
  display: flex;
  background-color: #fff;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  align-items: center;
  .item {
    align-items: center;
  }
  .left {
    flex: 1;
  }
  .mid {
    flex: 4;

    .default-address {
      p {
        padding: 2px;
        margin: 0;
        font-size: 12px;
      }
      p:nth-child(1) {
        font-size: 15px;
        span {
          font-size: 13px;
          color: #999;
        }
      }
      p:nth-child(3) {
        color: #ff7c00;
      }
    }
    .add-address {
      font-size: 14px;
    }
  }
  .right {
    flex: 1;
    position: relative;
    .van-icon {
      position: absolute;
      right: 0;
      bottom: 50%;
      transform: translateY(50%);
    }
  }
  img {
    width: 32px;
    height: 32px;
  }
}

.van-card {
  margin: 0 10px 10px 10px;
  border-radius: 10px;
  p {
    margin: 0;
    span:nth-child(1) {
      color: #999;
      padding: 0 5px;
    }
    span:nth-child(3) {
      color: #ff7c00;
      padding: 0 5px;
      font-size: 13px;
    }
  }
}

.total {
  color: gray;
  font-size: 13px;
}
</style>