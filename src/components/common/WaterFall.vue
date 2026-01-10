<template>
  <text class="title">推荐</text>
  <view class="waterfall">
    <view class="waterfall__col" v-for="id_num in waterFallColNum">
      <view class="waterfall__inner" :id="`col${id_num}`">
        <!-- zone之后要换成从数据库中查过来的 -->
        <Article v-for="(item, key) in columnLists[id_num - 1].value" :article="item" :key="key" :zone="item.zone ?? Math.random() < 0.5 ? 0 : 1"></Article>
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

defineOptions({
  options: {
    styleIsolation: 'shared', // 允许样式穿透（微信小程序）
  },
});

const props = withDefaults(defineProps<{ waterFallColNum: number; articleLists: ArticleType[] }>(), {
  waterFallColNum: 3,
  articleLists: () => [
    { title: '', author: '作者1', image: '/static/character/character1.png' },
    { title: '', author: '作者2', content: '我是一只小小小鸟啊啊啊' },
    { title: '', author: '作者3' },
    { title: '', author: '作者4' },
    { title: '', author: '作者5' },
    { title: '1221121', author: 'wangwu' },
    { title: '', author: '作者3' },
    { title: '', author: '作者4' },
    { title: '', author: '作者5' },
    { title: '1221121', author: 'wangwu' },
  ],
});

const columnLists = [] as any;
const columSelectors = [] as string[];

for (let id_num = 1; id_num <= props.waterFallColNum; id_num++) {
  columnLists[id_num - 1] = ref<Object[]>([]);
  columSelectors[id_num - 1] = `#col${id_num}`;
}
const getColHeight = (selector: string) =>
  new Promise<number>((resolve) => {
    const query = uni.createSelectorQuery().in(instance?.proxy);
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
  mountMenu(0);
});
</script>

<style scoped lang="scss">
.waterfall {
  display: flex;
  width: 100%;
  gap: 10rpx;
  padding: 20rpx;
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
