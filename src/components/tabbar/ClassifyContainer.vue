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
export default {
  data() {
    return {
      active: 0, //侧边导航显示隐藏
      items: [
        {
          text: "热门推荐",
          text_head: "热门分类",
          child: [
            {
              text: "空调",
              img_url: "http://localhost:3000/src/img/classify/hot/01.jpg",
            },
            {
              text: "冰箱",
              img_url: "http://localhost:3000/src/img/classify/hot/02.jpg",
            },
            {
              text: "电脑",
              img_url: "http://localhost:3000/src/img/classify/hot/03.jpg",
            },
            {
              text: "冰箱",
              img_url: "http://localhost:3000/src/img/classify/hot/04.jpg",
            },
            {
              text: "全面屏手机",
              img_url: "http://localhost:3000/src/img/classify/hot/05.jpg",
            },
            {
              text: "游戏手机",
              img_url: "http://localhost:3000/src/img/classify/hot/06.jpg",
            },
            {
              text: "保健品",
              img_url: "http://localhost:3000/src/img/classify/hot/07.jpg",
            },
            {
              text: "口罩",
              img_url: "http://localhost:3000/src/img/classify/hot/08.jpg",
            },
            {
              text: "驱蚊用品",
              img_url: "http://localhost:3000/src/img/classify/hot/09.jpg",
            },
            {
              text: "电磁炉",
              img_url: "http://localhost:3000/src/img/classify/hot/10.jpg",
            },
            {
              text: "电热水壶",
              img_url: "http://localhost:3000/src/img/classify/hot/11.jpg",
            },
            {
              text: "数据线",
              img_url: "http://localhost:3000/src/img/classify/hot/12.jpg",
            },
            {
              text: "图书",
              img_url: "http://localhost:3000/src/img/classify/hot/13.jpg",
            },
            {
              text: "美妆护肤",
              img_url: "http://localhost:3000/src/img/classify/hot/14.jpg",
            },
            {
              text: "除菌液",
              img_url: "http://localhost:3000/src/img/classify/hot/15.jpg",
            },
            {
              text: "休闲零食",
              img_url: "http://localhost:3000/src/img/classify/hot/16.jpg",
            },
            {
              text: "充电宝",
              img_url: "http://localhost:3000/src/img/classify/hot/17.jpg",
            },
            {
              text: "体温计",
              img_url: "http://localhost:3000/src/img/classify/hot/18.jpg",
            },
            {
              text: "投影机",
              img_url: "http://localhost:3000/src/img/classify/hot/19.jpg",
            },
            {
              text: "游戏机",
              img_url: "http://localhost:3000/src/img/classify/hot/20.jpg",
            },
          ],
        },
        {
          text: "手机数码",
          text_head: "热门品牌",
          child: [
            {
              text: "小米",
              img_url: "http://localhost:3000/src/img/classify/phone/01.jpg",
            },
            {
              text: "华为",
              img_url: "http://localhost:3000/src/img/classify/phone/02.jpg",
            },
            {
              text: "荣耀",
              img_url: "http://localhost:3000/src/img/classify/phone/03.jpg",
            },
            {
              text: "iPhone",
              img_url: "http://localhost:3000/src/img/classify/phone/04.jpg",
            },
            {
              text: "vivo",
              img_url: "http://localhost:3000/src/img/classify/phone/05.jpg",
            },
            {
              text: "OPPO",
              img_url: "http://localhost:3000/src/img/classify/phone/06.jpg",
            },
            {
              text: "魅族",
              img_url: "http://localhost:3000/src/img/classify/phone/07.jpg",
            },
            {
              text: "三星",
              img_url: "http://localhost:3000/src/img/classify/phone/08.jpg",
            },
            {
              text: "一加",
              img_url: "http://localhost:3000/src/img/classify/phone/09.jpg",
            },
            {
              text: "360手机",
              img_url: "http://localhost:3000/src/img/classify/phone/10.jpg",
            },
            {
              text: "锤子手机",
              img_url: "http://localhost:3000/src/img/classify/phone/11.jpg",
            },
            {
              text: "努比亚",
              img_url: "http://localhost:3000/src/img/classify/phone/12.jpg",
            },
          ],
        },
        {
          text: "电脑办公",
          text_head: "热卖分配",
          child: [
            {
              text: "轻薄本",
              img_url: "http://localhost:3000/src/img/classify/computer/01.jpg",
            },
            {
              text: "游戏本",
              img_url: "http://localhost:3000/src/img/classify/computer/02.jpg",
            },
            {
              text: "机械键盘",
              img_url: "http://localhost:3000/src/img/classify/computer/03.jpg",
            },
            {
              text: "组装电脑",
              img_url: "http://localhost:3000/src/img/classify/computer/04.jpg",
            },
            {
              text: "移动硬盘",
              img_url: "http://localhost:3000/src/img/classify/computer/05.jpg",
            },
            {
              text: "显卡",
              img_url: "http://localhost:3000/src/img/classify/computer/06.jpg",
            },
            {
              text: "游戏台式机",
              img_url: "http://localhost:3000/src/img/classify/computer/07.jpg",
            },
            {
              text: "家用打印机",
              img_url: "http://localhost:3000/src/img/classify/computer/08.jpg",
            },
            {
              text: "吃鸡装备",
              img_url: "http://localhost:3000/src/img/classify/computer/09.jpg",
            },
            {
              text: "曲屏显示器",
              img_url: "http://localhost:3000/src/img/classify/computer/10.jpg",
            },
            {
              text: "投影机",
              img_url: "http://localhost:3000/src/img/classify/computer/11.jpg",
            },
            {
              text: "日本文具",
              img_url: "http://localhost:3000/src/img/classify/computer/12.jpg",
            },
            {
              text: "笔记本",
              img_url: "http://localhost:3000/src/img/classify/computer/13.jpg",
            },
            {
              text: "平板电脑",
              img_url: "http://localhost:3000/src/img/classify/computer/14.jpg",
            },
            {
              text: "一体机",
              img_url: "http://localhost:3000/src/img/classify/computer/15.jpg",
            },
          ],
        },
        {
          text: "家用电器",
          text_head: "厨房小电",
          child: [
            {
              text: "电压力锅",
              img_url:
                "http://localhost:3000/src/img/classify/appliances/01.jpg",
            },
            {
              text: "电热水壶",
              img_url:
                "http://localhost:3000/src/img/classify/appliances/02.jpg",
            },
            {
              text: "电饭煲",
              img_url:
                "http://localhost:3000/src/img/classify/appliances/03.jpg",
            },
            {
              text: "电磁炉",
              img_url:
                "http://localhost:3000/src/img/classify/appliances/04.jpg",
            },
            {
              text: "微波炉",
              img_url:
                "http://localhost:3000/src/img/classify/appliances/05.jpg",
            },
            {
              text: "电饼铛",
              img_url:
                "http://localhost:3000/src/img/classify/appliances/06.jpg",
            },
            {
              text: "豆浆机",
              img_url:
                "http://localhost:3000/src/img/classify/appliances/07.jpg",
            },
            {
              text: "多用途锅",
              img_url:
                "http://localhost:3000/src/img/classify/appliances/08.jpg",
            },
            {
              text: "料理机",
              img_url:
                "http://localhost:3000/src/img/classify/appliances/09.jpg",
            },
            {
              text: "榨汁机",
              img_url:
                "http://localhost:3000/src/img/classify/appliances/10.jpg",
            },
            {
              text: "电烤箱",
              img_url:
                "http://localhost:3000/src/img/classify/appliances/11.jpg",
            },
            {
              text: "煎药壶",
              img_url:
                "http://localhost:3000/src/img/classify/appliances/12.jpg",
            },
            {
              text: "电炖锅",
              img_url:
                "http://localhost:3000/src/img/classify/appliances/13.jpg",
            },
            {
              text: "电烧烤炉",
              img_url:
                "http://localhost:3000/src/img/classify/appliances/14.jpg",
            },
            {
              text: "面包机",
              img_url:
                "http://localhost:3000/src/img/classify/appliances/15.jpg",
            },
          ],
        },
        {
          text: "美妆护肤",
          text_head: "热销种类",
          child: [
            {
              text: "防晒",
              img_url:
                "http://localhost:3000/src/img/classify/cosmetics/01.jpg",
            },
            {
              text: "控油",
              img_url:
                "http://localhost:3000/src/img/classify/cosmetics/02.jpg",
            },
            {
              text: "面膜",
              img_url:
                "http://localhost:3000/src/img/classify/cosmetics/03.jpg",
            },
            {
              text: "显白口红",
              img_url:
                "http://localhost:3000/src/img/classify/cosmetics/04.jpg",
            },
            {
              text: "小美盒",
              img_url:
                "http://localhost:3000/src/img/classify/cosmetics/05.jpg",
            },
            {
              text: "新片速递",
              img_url:
                "http://localhost:3000/src/img/classify/cosmetics/06.jpg",
            },
            {
              text: "精选礼盒",
              img_url:
                "http://localhost:3000/src/img/classify/cosmetics/07.jpg",
            },
            {
              text: "潮流风向",
              img_url:
                "http://localhost:3000/src/img/classify/cosmetics/08.jpg",
            },
            {
              text: "女士香水",
              img_url:
                "http://localhost:3000/src/img/classify/cosmetics/09.jpg",
            },
            {
              text: "男士香水",
              img_url:
                "http://localhost:3000/src/img/classify/cosmetics/10.jpg",
            },
            {
              text: "香水礼盒",
              img_url:
                "http://localhost:3000/src/img/classify/cosmetics/11.jpg",
            },
          ],
        },
        {
          text: "服装衣饰",
          text_head: "热卖选购",
          child: [
            {
              text: "夹克",
              img_url: "http://localhost:3000/src/img/classify/clothes/01.jpg",
            },
            {
              text: "T恤",
              img_url: "http://localhost:3000/src/img/classify/clothes/02.jpg",
            },
            {
              text: "针织衫",
              img_url: "http://localhost:3000/src/img/classify/clothes/03.jpg",
            },
            {
              text: "衬衫",
              img_url: "http://localhost:3000/src/img/classify/clothes/04.jpg",
            },
            {
              text: "卫衣",
              img_url: "http://localhost:3000/src/img/classify/clothes/05.jpg",
            },
            {
              text: "风衣",
              img_url: "http://localhost:3000/src/img/classify/clothes/06.jpg",
            },
            {
              text: "牛仔裤",
              img_url: "http://localhost:3000/src/img/classify/clothes/07.jpg",
            },
            {
              text: "休闲裤",
              img_url: "http://localhost:3000/src/img/classify/clothes/08.jpg",
            },
            {
              text: "自营男装",
              img_url: "http://localhost:3000/src/img/classify/clothes/09.jpg",
            },
            {
              text: "新品T恤",
              img_url: "http://localhost:3000/src/img/classify/clothes/10.jpg",
            },
            {
              text: "短袖T恤",
              img_url: "http://localhost:3000/src/img/classify/clothes/11.jpg",
            },
            {
              text: "新品衬衫",
              img_url: "http://localhost:3000/src/img/classify/clothes/12.jpg",
            },
            {
              text: "短袖衬衫",
              img_url: "http://localhost:3000/src/img/classify/clothes/13.jpg",
            },
            {
              text: "新品卫衣",
              img_url: "http://localhost:3000/src/img/classify/clothes/14.jpg",
            },
            {
              text: "连帽卫衣",
              img_url: "http://localhost:3000/src/img/classify/clothes/15.jpg",
            },
          ],
        },
      ], //侧边导航文本
      screeHeight: window.innerHeight - 105 + "px", // 屏幕高
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