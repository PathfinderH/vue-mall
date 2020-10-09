<template>
  <div class="shopcar_content" v-show="$store.state.isLogin">
    <!-- <div class="backgroundImg" :style="{ height: backgroundImgHeight }"></div> -->

    <div class="shopcar">
      <!-- 购物车头部 -->
      <div class="header">
        <div class="car_bar">
          <!-- <p>{{ $store.getters.getGoodsSelected }}</p> -->
          <h2 class="title">购物车({{ $store.getters.getAllCount }})</h2>
          <span class="manage" @click="manage">管理</span>
        </div>
        <p class="info">
          共选中了{{ $store.getters.getGoodsCountAndAmount.count }}件宝贝
        </p>
      </div>
      <!-- 购物车列表商品 -->
      <div class="content">
        <van-card
          v-for="(item, index) in shopcar_list"
          :key="index"
          :num="$store.getters.getGoodsCount[item.id]"
          :price="item.price"
          desc=""
          :title="item.title"
          :thumb="item.img_url"
          :origin-price="item.original_price"
          :thumb-link="'/#/home/product' + item.id"
        >
          <template #footer>
            <van-stepper
              v-model="$store.getters.getGoodsCount[item.id]"
              @change="onChange(item.id, $store.getters.getGoodsCount[item.id])"
              integer
            />
            <van-checkbox
              ref="checkbox"
              v-model="$store.getters.getGoodsSelected[item.id]"
              @click="
                selectedClick(item.id, $store.getters.getGoodsSelected[item.id])
              "
              class="checkeds"
            ></van-checkbox>
          </template>
        </van-card>
      </div>

      <!-- 购物车为空时内容 -->
      <div class="shopcar_null" v-show="shopcar_falg">
        <div class="null_logo">
          <img src="/src/assets/img/home_imgs/null_logo.webp" />
        </div>
        <h3>购物车竟然是空的</h3>
        <p>再忙,也要记得买点什么犒劳自己~</p>
        <div class="go_btn">
          <van-button type="default" color="#F4F4F4" @click="goShopcar"
            >去逛逛</van-button
          >
        </div>
      </div>
    </div>
    <!-- 提交订单 -->
    <van-submit-bar
      button-color="-webkit-linear-gradient(right, #ff5000 0%, #ff8400 100%)"
      :price="$store.getters.getGoodsCountAndAmount.amount"
      :button-text="'结算(' + $store.getters.getGoodsCountAndAmount.count + ')'"
      @submit="onSubmit"
    >
      <van-checkbox v-model="$store.state.check_all" @click="checkAll"
        >全选</van-checkbox
      >
    </van-submit-bar>

    <!-- 删除商品 -->
    <transition name="van-fade">
      <van-submit-bar
        class="delete-product"
        v-show="delete_flag"
        button-text="删除"
        @submit="delete_product"
        button-type="default"
      >
        <van-checkbox
          v-model="$store.state.check_all"
          class="delete_check"
          @click="checkAll"
          >全选</van-checkbox
        >
      </van-submit-bar>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shopcar_list: [], //购物车列表商品信息
      shopcar_falg: false,
      delete_flag: false,
    };
  },

  created() {
    //  console.log(this.$store.state.isLogin);

    if (this.$store.state.isLogin == false) {
      this.$router.push("/login");
    }
    this.getShopcarList();
    this.getShopcarLength();
  },

  methods: {
    //去逛逛按钮
    goShopcar() {
      this.$router.push("/home");
    },

    //判断购物车是否为空
    getShopcarLength() {
      if (this.$store.state.car.length == 0) {
        this.$store.state.commit("getAllSelected_false");
        this.shopcar_falg = true;
      } else {
        this.shopcar_falg = false;
      }
    },

    //获取购物车信息
    getShopcarList() {
      let idArr = [];
      this.$store.state.car.forEach((item) => {
        idArr.push(item.id);
      });

      //购物车中没有商品直接返回
      if (idArr.length <= 0) {
        return;
      }

      this.axios
        .get("/getShopcar/" + idArr.join(","))
        .then((response) => {
          this.shopcar_list = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          Toast.fail("获取数据失败");
          console.log(error);
        });
    },

    // 购物车数据中的数据改变时调用mutations中的方法将数据更新到state中
    onChange(goods_id, num) {
      console.log(goods_id);
      this.$store.commit("updateGoodsInfo", {
        id: goods_id,
        count: num,
      });
    },

    //将勾选的商品按钮状态selected更新到state中
    selectedClick(id, val) {
      this.$store.commit("updateGoodsSelected", {
        id,
        selected: val,
      });
      this.$store.commit("getAllSelected_false");
    },

    //全选按钮
    checkAll() {
      this.$store.commit("updateAllSelected", this.$store.state.check_all);
    },

    //提交订单
    onSubmit() {
      if (this.$store.getters.getGoodsCountAndAmount.count != 0) {
        Toast.success("提交成功~");
      } else {
        Toast.fail("请选择商品");
      }
    },

    //删除按钮
    manage() {
      this.delete_flag = !this.delete_flag;
    },
    delete_product() {
      if (this.$store.getters.getGoodsCountAndAmount.count != 0) {
        Dialog.confirm({
          title: "确定删除选中的宝贝吗",
          cancelButtonText: "我再想想",
          // message: "确定删除这个宝贝吗",
        })
          .then(() => {
            this.confirm();
          })
          .catch(() => {});
      } else {
        Toast("您还没有选择宝贝哦！");
      }
    },

    //删除按钮时点击确定
    confirm() {
      let newCar = [];
      this.$store.state.car.forEach((element) => {
        if (element.selected == false) {
          newCar.push(element);
        }
        return newCar;
      });

      this.$store.commit("removeProduct", newCar);
      this.shopcar_list = newCar;

      this.getShopcarList();
      this.getShopcarLength();

      Toast.success("删除成功");
    },
  },
};
</script>

<style lang="scss" scoped>
h2 {
  padding: 0;
  margin: 0;
}
.shopcar_content {
  //购物车头部
  .header {
    height: 170px;
    background-image: -webkit-linear-gradient(right, #ff5000 0%, #ff8400 100%);
    .car_bar {
      padding: 20px 12px 10px 12px;
      color: #fff;
      overflow: hidden;
      .title {
        display: inline-block;
        font-size: 20px;
      }
      .manage {
        float: right;
      }
    }
  }

  .shopcar {
    .content {
      position: absolute;
      top: 100px;
      margin-bottom: 100px;
    }
    .info {
      padding: 0 12px 10px 12px;
      color: #fff;
      font-size: 13px;
    }
  }

  //购物车为空时
  .shopcar_null {
    text-align: center;
    width: 100%;
    height: 240px;
    .null_logo {
      margin: 0 auto;
      padding-top: 10px;
      width: 110px;
      img {
        width: 100%;
      }
    }
    h3,
    p {
      padding: 5px 0;
      margin: 0;
      color: #5f646e;
      font-weight: 100;
    }
    p {
      font-size: 13px;
      color: #999;
    }
    .van-button--default {
      border: 1px solid #dddddd !important;
      color: #5f646e !important;
      padding: 0 20px;
      height: 40px;
    }
  }

  //购物车列表商品
  .van-card__num {
    font-size: 15px;
    margin-bottom: 5px;
  }
  .content {
    width: 100%;
    .van-card {
      position: relative;
      border-radius: 10px;
      margin: 12px;
      min-width: 90%;
      padding-left: 40px;
    }
  }
  .van-submit-bar {
    bottom: 48px;
    border-bottom: 1px solid #e1e2e4;
  }
  .van-submit-bar__price {
    color: #ff5000;
  }
  .van-card__footer .checkeds {
    position: absolute;
    left: 10px;
    bottom: 50%;
    margin-bottom: -10px;
  }

  //字体设置
  .van-card__price {
    color: #ff5000;
    font-size: 16px;
  }
  .van-card__origin-price {
    font-size: 13px;
  }
  .van-card__title {
    font-size: 15px;
  }

  //删除商品
  .delete_check {
    position: absolute;
    left: 16px;
  }
  .delete-product {
    .van-submit-bar__button {
      width: 60px;
      height: 30px;
      border: 1px solid #999;
    }
    .van-button--default {
      color: gray;
      background-color: #f4f4f4;
    }
  }
}
</style>