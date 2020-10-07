<template>
  <div class="edit-address">
    <van-nav-bar
      title="编辑收货地址"
      :border="false"
      @click-left="$router.back(-1)"
    >
      <template #left>
        <van-icon name="arrow-left" size="20" color="#999" />
      </template>
    </van-nav-bar>

    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import { Toast } from 'vant';

export default {
  data() {
    return {
      areaList:{},
      searchResult: [],
    };
  },
  methods: {
    onSave() {
      Toast('save');
    },
    onDelete() {
      Toast('delete');
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: '黄龙万科中心',
            address: '杭州市西湖区',
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>