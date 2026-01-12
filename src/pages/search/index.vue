<template>
  <PageWrapper class="w-full">
    <go-back type="search" @search="search" :collection-list="collectionList"></go-back>
    <template #scroll>
      <water-fall :waterFallColNum="2" :article-lists="articleList"></water-fall>
    </template>
  </PageWrapper>
</template>

<script setup lang="ts">
import GoBack from '@/components/common/GoBack.vue';
import PageWrapper from '@/components/container/PageContainer.vue';
import WaterFall from '@/components/common/WaterFall.vue';
import { ref } from 'vue';
import { searchArticle } from '@/api/articleApi';
import type { Article } from '../tagPage/type';
const articleList = ref<Article[]>([]);
async function search(searchText: string, collection: any) {
  await searchArticle(searchText).then((res) => {
    articleList.value = res;
  });
}

const collectionList = ref([
  { id: 1, name: '同人文' },
  { id: 2, name: '同人图' },
]);
</script>

<style lang="scss">
.go-back-container__search {
  .search-input-container__input {
    width: 500rpx !important;
    height: 55rpx !important;
  }
}
</style>
