<template>
  <view class="waterfall">
    <view class="waterfall__col" v-for="(id_num, idx) in waterFallColNum" :key="idx">
      <view class="waterfall__inner" :id="`col${id_num}`">
        <!-- zone之后要换成从数据库中查过来的 -->
        <Article v-for="(item, key) in columnLists[id_num - 1].value" :article="item" :key="key"
          :zone="item?.image_urls?.length ? 0 : 1"></Article>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue';
import { getCurrentInstance } from 'vue';
import Article from '@/components/common/Article/index.vue';
import type { ArticleType } from '@/types/index';
const instance = getCurrentInstance();

defineOptions({
  options: {
    styleIsolation: 'shared', // 允许样式穿透（微信小程序）
  },
});

const props = withDefaults(defineProps<{ waterFallColNum: number; articleLists: ArticleType[] }>(), {
  waterFallColNum: 3,
  articleLists: () => [
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

const mountMenu = async () => {
  for (let index = 0; index < props.articleLists.length; index++) {
    const targetColumnIndex = await getColumnIndex();
    columnLists[targetColumnIndex].value.push(props.articleLists[index]);
    await nextTick();
  }
};

const resetColumns = () => {
  columnLists.forEach((column) => {
    column.value = [];
  });
};

const renderArticles = async () => {
  // resetColumns();
  await nextTick();
  await mountMenu();
};

onMounted(() => {
  renderArticles();
});

watch(
  () => props.articleLists,
  () => {
    renderArticles();
  },
  { deep: true }
);

defineExpose({
  resetColumns,
});
</script>

<style scoped lang="scss">
.waterfall {
  display: flex;
  width: 100%;
  padding: 0 10rpx;
  box-sizing: border-box;

  &__col {
    flex: 1;
    display: flex;
    flex-direction: column;

    &:not(:last-child) {
      margin-right: 8rpx;
    }
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
