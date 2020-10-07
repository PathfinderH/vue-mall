<template>
  <div class="my-address">

      <van-nav-bar
        title="我的收货地址"
        :border="false"
        @click-left="$router.back(-1)"
      >
        <template #left>
          <van-icon name="arrow-left" size="20" color="#999" />
        </template>
      </van-nav-bar>

    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />

  </div>
</template>

<script>
import { Toast } from "vant";

export default {
  data() {
    return {
      chosenAddressId: "1",
      list: [
        {
          id: "1",
          name: "张三",
          tel: "13000000000",
          address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室",
          isDefault: true,
        },
    
      ],

    };
  },
  created(){
      console.log(this.$store.state.currentUser[0].id);
this.getAdress();
  },
  methods: {
      //获取收货地址
      getAdress(){
        let params = new URLSearchParams();
        params.append('id', this.$store.state.currentUser[0].id);

        this.axios.post('/userAdress', params)
            .then((response)=> {
                console.log(response.data);
                this.list = response.data;
            })
             .catch((error) => {
            Toast.fail('获取数据失败')
            console.log(error);
          });
      },

      //新增地址
    onAdd() {
      this.$router.push('/mine/set/myAddress/editAddress')
    },
    //编辑地址
    onEdit(item, index) {
      Toast('编辑地址'+index+item)
    },
  },
};
</script>

<style lang="scss" scoped>
</style>