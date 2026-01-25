<template>
  <view class="favorite-component">
    <GridArticlesContainer :article-list="articleList">
    </GridArticlesContainer>
  </view>
</template>

<script setup lang="ts">
import GridArticlesContainer from "@/components/common/GridArticlesContainer/index.vue";
import { onMounted, ref } from "vue";
import type { Article } from '@/pages/tagPage/type'
import { getFavoriteArticles } from "@/api/articleApi";
// 查接口
const articleList = ref<Article[]>([])
onMounted(async () => {
  articleList.value = await getFavoriteArticles()
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
