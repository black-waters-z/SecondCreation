<template>
  <view class="favorite-component">
    <GridArticlesContainer :article-list="source?.length ? source : me_source" type="grid">
    </GridArticlesContainer>
  </view>
</template>

<script setup lang="ts">


defineOptions({
  options: {
    virtualHost: true,
  },
});import { getFavoriteArticles } from "@/api/articleApi";
import GridArticlesContainer from "@/components/common/GridArticlesContainer/index.vue";
import type { Article } from '@/pages/tagPage/type'
import { onMounted, ref } from "vue";
defineProps<{ source: Article[] }>()
const me_source = ref<Article[]>()

onMounted(async () => {
  me_source.value = await getFavoriteArticles(1, 10)
})

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
