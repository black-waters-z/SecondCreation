<template>
  <view class="waterfall">
    <view class="waterfall__col">
      <view class="waterfall__inner" id="col1">
        <Article
          v-for="item in articleList1"
          :article="item"
          :zone="1"
        ></Article>
      </view>
    </view>
    <view class="waterfall__col">
      <view class="waterfall__inner" id="col2">
        <Article v-for="item in articleList2" :article="item"></Article>
      </view>
    </view>
    <view class="waterfall__col">
      <view class="waterfall__inner" id="col3">
        <Article v-for="item in articleList3" :article="item"></Article>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";
import { getCurrentInstance } from "vue";
import Article from "@/components/common/Article.vue";
const instance = getCurrentInstance();

interface Article {
  id?: number;
  title: string;
  author: string;
  image?: string;
  content?: string;
}

const props = withDefaults(defineProps<{ articleLists: Article[] }>(), {
  articleLists: () => [
    { title: "", author: "", image: "/static/character/character1.png" },
    { title: "", author: "", content: "我是一只小小小鸟啊啊啊" },
    { title: "", author: "" },
    { title: "", author: "" },
    { title: "", author: "" },
    { title: "1221121", author: "wangwu" },
    { title: "", author: "", image: "/static/character/character1.png" },
    { title: "", author: "", content: "我是一只小小小鸟啊啊啊" },
    { title: "", author: "" },
    { title: "", author: "" },
  ],
});

const articleList1 = ref<Article[]>([]);
const articleList2 = ref<Article[]>([]);
const articleList3 = ref<Article[]>([]);

const columSelectors = ["#col1", "#col2", "#col3"];
const columnLists = [articleList1, articleList2, articleList3];

const getColHeight = (selector: string) => {
  let info: any;
  uni
    .createSelectorQuery()
    .in(instance?.proxy || null)
    .select(selector)
    .boundingClientRect((res) => {
      info = Array.isArray(res) ? res[0] : res;
      console.log(selector, " 高度：", info?.height);
    })
    .exec();
  return info?.height;
};
const getColumnIndex = () => {
  const heights = columSelectors.map((col) => getColHeight(col) ?? 0);
  let minIndex = 0;
  let minHeight = heights[0];

  heights.forEach((height, index) => {
    if (height < minHeight) {
      minHeight = height;
      minIndex = index;
    }
  });

  return minIndex;
};

const mountMenu = (index = 0) => {
  if (index >= props.articleLists.length) {
    return;
  }
  const targetColumnIndex = getColumnIndex();
  columnLists[targetColumnIndex].value.push(props.articleLists[index]);

  nextTick(() => mountMenu(index + 1));
};

onMounted(() => {
  mountMenu();
});
</script>

<style scoped lang="scss">
.waterfall {
  display: flex;
  width: 100%;
  gap: 16rpx;
  padding: 20rpx;
  box-sizing: border-box;
  padding-top: 80rpx;

  &__col {
    width: 25%;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16rpx;
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(20rpx);
}
</style>
