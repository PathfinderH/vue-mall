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
      :height="screeHeight"
      :items="items"
      :main-active-index.sync="active"
    >
      <template #content>
        <div
          v-show="active === index"
          v-for="(item, index) in items"
          :key="index"
        >
          <div class="select-content">
            <h4>{{ item.text }}</h4>

            <van-row gutter="20">
              <van-col
                span="8"
                v-for="(v, index) in item.child"
                :key="index"
                class="select-content-child"
              >
                <router-link
                  :to="{ name: 'search', params: { search: v.text } }"
                >
                  <img
                    :src="v.img_url"
                    :style="{ width: scrollWidth * 0.187 + 'px' }"
                  />

                  <span :style="{ 'font-size': scrollWidth * 0.032 + 'px' }">{{
                    v.text
                  }}</span>
                </router-link>
              </van-col>
            </van-row>
          </div>
        </div>
      </template>
    </van-tree-select>
  </div>
</template>

<script>
import info from '../assets/js/info.js'
export default {
  data() {
    return {
      active: 0, //侧边导航显示隐藏
      items: info.classify_items, //侧边导航文本
      screeHeight: window.innerHeight - 105 + "px", 
      scrollWidth: window.innerWidth,
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
.van-tree-select {
  .van-tree-select__content {
    flex: 3;
  }
  .select-content {
    padding: 0 5%;
    h4 {
      margin: 15px 0 0 0;
    }
    span {
      font-size: 12px;
      color: #787878;
    }
  }
}
.select-content-child {
  text-align: center;
  padding-bottom: 14px;
}
</style>