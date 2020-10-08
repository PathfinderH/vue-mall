<template>
  <div class="my-address">
    <!-- 收货地址栏 -->
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
      :switchable="false"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />

    <!-- 弹出层编辑和新增地址 -->
    <van-popup
      v-model="show"
      position="bottom"
      closeable
      close-icon="close"
      @closed="close"
      :style="{ height: '100%' }"
    >
      <div class="edit-address">
        <van-nav-bar :title="head_title" :border="false"> </van-nav-bar>
        <van-address-edit
          :show-delete="popup_flag"
          :area-list="areaList"
          :address-info="address_info"
          show-postal
          show-set-default
          show-search-result
          :area-columns-placeholder="['请选择', '请选择', '请选择']"
          @save="onSave"
          @delete="onDelete"
        />
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Toast } from "vant";

export default {
  data() {
    return {
      show: false, //popup弹出框的显示隐藏
      popup_flag: false, //判断popup弹出框是修改地址信息还是增加地址信息
      chosenAddressId: "1", //当前选中地址的ID
      list: [], //收货地址
      address_info: {}, //收货地址初始值
      areaList: this.area, //省市数据
      head_title: "",
    };
  },
  created() {
    this.list = this.$store.state.address;
    // console.log(this.info.info);
  },
  methods: {
    close() {
      this.address_info = {};
    },
    //新增地址
    onAdd() {
      this.show = true;
      this.popup_flag = false;
      this.head_title = "新增收货地址";
    },
    //编辑地址
    onEdit(item, index) {
      this.show = true;
      this.popup_flag = true;
      this.head_title = "编辑收货地址";
      this.address_info = item;
    },

    //保存地址
    onSave(content) {
      if (this.popup_flag == true) {
        this.$store.commit("editAdress", content);
        this.address_info = {};
        Toast.success("保存成功");
        this.show = false;
      } else if (this.popup_flag == false) {
        let info = {
          id: this.$store.state.address.length,
          name: content.name, //姓名
          tel: content.tel, //电话
          province: content.province,
          city: content.city,
          county: content.county,
          addressDetail: content.addressDetail,
          //地址
          address:
            content.province +
            content.city +
            content.county +
            content.addressDetail,
          isDefault: content.isDefault, //是否默认地址
          postalCode: content.postalCode, //邮编
          areaCode: content.areaCode, //地区编码
        };

        this.$store.commit("saveAdress", info);
        this.address_info = {};
        Toast.success("保存成功");
        this.show = false;
      }
    },
    //删除地址
    onDelete(content) {
      this.$store.commit("deleteAdress", content.id);
      this.show = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>