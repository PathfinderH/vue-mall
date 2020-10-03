<template>
  <div>
    <!-- 顶部搜索框 -->
    <van-search
      background="#eeeeee"
      shape="round"
      placeholder="请输入搜索关键词"
      @focus="getFocus"
      class="van-hairline--bottom"
    />
<!-- 侧边导航 -->
    <van-tree-select
      :height="this.screeHeight"
      :items="items"
      :main-active-index.sync="active"
    >
      <template #content>
        <div v-if="active === 0">1</div>
        <div v-if="active === 1">2</div>
        <div v-if="active === 2">3</div>
        <div v-if="active === 3">4</div>
        <div v-if="active === 4">5</div>
        <div v-if="active === 5">6</div>
      </template>
    </van-tree-select>

  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,//侧边导航显示隐藏
      items: [
        { text: "热门推荐" },
        { text: "手机数码" },
        { text: "电脑办公" },
        { text: "家用电器" },
        { text: "美妆护肤" },
        { text: "服装衣饰" },
      ],//侧边导航文本
      screeHeight: window.innerHeight - 105 + "px", // 屏幕高
    };
  },

  methods: {
    getFocus() {
      this.$router.push("/search");
    },
  },
   
};
</script>

<style lang="scss" scoped>

</style>