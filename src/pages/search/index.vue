<template>
  <PageWrapper class="w-full">
    <go-back show-logo></go-back>
    <SimpleSearch v-model="searchKey" @confirm="search"></SimpleSearch>
    <template #scroll>
      <not-found v-if="articleList.length === 0"></not-found>
      <match-media :min-width="600">
        <water-fall :waterFallColNum="5" ref="waterFall1" :article-lists="articleList"></water-fall>
      </match-media>
      <match-media :max-width="600">
        <water-fall :waterFallColNum="2" ref="waterFall2" :article-lists="articleList"></water-fall>
      </match-media>
    </template>
  </PageWrapper>
</template>

<script setup lang="ts">
import GoBack from '@/components/common/GoBack.vue';
import PageWrapper from '@/components/container/PageContainer.vue';
import WaterFall from '@/components/common/WaterFall.vue';
import SimpleSearch from '@/components/base/ScSearch/SimpleSearch.vue';
import { ref, } from 'vue';
import { searchArticle } from '@/api/articleApi';
import type { Article } from '../tagPage/type';
import { type queryArticleKey } from '@/api/tagApi';
import NotFound from "@/components/base/NotFound/index.vue"
const waterFall1 = ref<InstanceType<typeof WaterFall>>()
const articleList = ref<Article[]>([]);

const searchKey = ref<string>('');
const postKey = ref<queryArticleKey>({
  order_by: '-total_score',
  page: 1,
  per_page: 100
})
async function search() {
  if (!searchKey.value) return;
  waterFall1.value?.resetColumns()
  postKey.value.keyword = searchKey.value;
  await searchArticle(postKey.value).then((res) => {
    articleList.value = res;
  });
}

// const collectionList = ref([
//   { id: 1, name: '同人文' },
//   { id: 2, name: '同人图' },
// ]);
</script>

<style lang="scss">
page {
  height: 100%;
}


.go-back-container__search {
  .search-input-container__input {
    width: 500rpx !important;
    height: 55rpx !important;
  }
}
</style>
