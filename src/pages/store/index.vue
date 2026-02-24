<template>
  <page-wrapper have_no_more class="w-full store" show-head const ref="pageWrapper" :fetch-data="fetchData">
    <store-tab v-slot="{ startFilter }" @fetch-data="toggleData" @filter-articles="filterArticles">
      <filter-store-article @start-filter="startFilter"></filter-store-article>
    </store-tab>
    <template #scroll>
      <grid-articles-container class="w-full grid-articles-container" :article-list="articleList"
        ref="gridArticle"></grid-articles-container>
    </template>
    <to-top></to-top>
    <post-sheet class="w-full"></post-sheet>
    <post-sheet-show></post-sheet-show>
  </page-wrapper>
</template>

<script setup lang="ts">
import StoreTab from './components/StoreTab.vue';
import PostSheet from '@/components/common/PostSheet/index.vue';
import PostSheetShow from '@/components/common/PostSheet/PostSheetShow.vue';
import ToTop from '@/components/common/ToTop.vue';
import PageWrapper from '@/components/container/PageContainer.vue';
import GridArticlesContainer from '@/components/common/GridArticlesContainer/index.vue';
import filterStoreArticle from '@/components/form/filterStoreArticle.vue';
import { useHeadBarStore } from '@/store/useHeadBar';
import { onShow } from '@dcloudio/uni-app';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useFilterStoreArticles } from '@/hooks/useFilterStoreArticles';

const pageWrapper = ref<InstanceType<typeof PageWrapper> | null>(null);
const gridArticle = ref<InstanceType<typeof GridArticlesContainer> | null>(null);
const { activeNavigatorIndex } = storeToRefs(useHeadBarStore());
onShow(() => {
  if (activeNavigatorIndex.value === -1) activeNavigatorIndex.value = 0;
});

const { fetchData, filterArticles, articleList, toggleData } = useFilterStoreArticles(pageWrapper, gridArticle);


</script>

<style lang="scss">
.scroll-Y {
  flex: 1;
}

.content {
  height: calc(100vh - 90rpx);
}

.store-container {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
}

.store {
  .grid-articles-container {
    .waterfall {
      padding-top: 0 !important;
    }
  }

  .store-tab {
    .select-collection-container {
      background-color: white;
    }
  }
}


@media screen and (min-width: 600px) {
  .content {
    align-items: flex-start;
  }

  .store-content {
    height: 100%;
    margin-top: 0;
  }

  .store-tab {
    margin-left: 20px;
  }

  .uni-scroll-view-refresher {
    background-color: white !important;
  }
}
</style>
