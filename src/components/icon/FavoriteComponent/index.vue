<template>
  <view class="waterfall">
    <view class="waterfall__col">
      <view class="waterfall__inner" id="col1">
        <Article v-for="item in articleList1" :article="item" :zone="1"></Article>
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
import { nextTick, onMounted, ref } from 'vue';
import { getCurrentInstance } from 'vue';
import Article from '@/components/common/Article.vue';
import type { Article as ArticleType } from '@/types/index';
const instance = getCurrentInstance();

const props = withDefaults(defineProps<{ articleLists: ArticleType[] }>(), {
  articleLists: () => [
  ],
});

const articleList1 = ref<ArticleType[]>([]);
const articleList2 = ref<ArticleType[]>([]);
const articleList3 = ref<ArticleType[]>([]);

const columSelectors = ['#col1', '#col2', '#col3'];
const columnLists = [articleList1, articleList2, articleList3];

const query = uni.createSelectorQuery().in(instance?.proxy);
const getColHeight = (selector: string) =>
  new Promise<number>((resolve) => {
    query
      .select(selector)
      .boundingClientRect((res) => {
        const info = Array.isArray(res) ? res[0] : res;
        resolve(info?.height ?? 0);
      })
      .exec();
  });

const getColumnIndex = async () => {
  const heights = await Promise.all(columSelectors.map(getColHeight));
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

const mountMenu = async (index = 0) => {
  if (index >= props.articleLists.length) {
    return;
  }
  const targetColumnIndex = await getColumnIndex();
  columnLists[targetColumnIndex].value.push(props.articleLists[index]);

  await nextTick();
  mountMenu(index + 1);
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
  padding: 0 20rpx;
  box-sizing: border-box;

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
