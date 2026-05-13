<template>
  <page-wrapper have_no_more :fetch-data="loadMoreArticles">
    <!-- 首页头部 -->
    <head-nav show-search class="position-sticky top-0 z-100"></head-nav>
    <!-- #ifdef MP-WEIXIN -->
    <up-line></up-line>
    <!-- <up-swiper :list="list2" keyName="image" showTitle :autoplay="false" circular></up-swiper> -->
    <!-- #endif -->
    <match-media :min-width="600">
      <SimpleSearch v-model="searchKey"></SimpleSearch>
    </match-media>
    <template #scroll>
      <match-media :max-width="599" class="w-full">
        <water-fall :waterFallColNum="2" :article-lists="articleList"></water-fall>
      </match-media>
      <match-media :min-width="600" class="w-full">
        <water-fall :waterFallColNum="5" :article-lists="articleSearchList" ref="waterfallRef"></water-fall>
      </match-media>
    </template>
    <post-sheet class="w-full"></post-sheet>
    <post-sheet-show></post-sheet-show>
  </page-wrapper>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
// #ifdef H5
import CommonSwiper from '@/components/common/CommonSwiper.vue';
// #endif
import PostSheet from '@/components/common/PostSheet/index.vue';
import PostSheetShow from '@/components/common/PostSheet/PostSheetShow.vue';
import HeadNav from '@/components/common/HeadNav.vue';
import WaterFall from '@/components/common/WaterFall.vue';
import HomeProduct from './components/HomeProduct.vue';
import SimpleSearch from '@/components/base/ScSearch/SimpleSearch.vue';
import PageWrapper from '@/components/container/PageContainer.vue';
import { getGoodsInfo } from '@/api/shopApi';
import { onLoad } from '@dcloudio/uni-app';
import { getRecommenedArticles } from '@/api/articleApi';
import type { Article } from '../tagPage/type';
import type { goodInfo } from '../shopping/type';

if (process.env.NODE_ENV === 'development') {
  console.log(import.meta.env.DEV);
  console.log('开发环境');
} else {
  console.log('生产环境');
}
const articleList = ref<Article[]>([]);

const searchKey = ref('');
const waterfallRef = ref<InstanceType<typeof WaterFall> | null>(null);
const articleSearchList = ref<Article[]>([]);

watch(
  () => searchKey.value,
  () => {
    waterfallRef.value.resetColumns();
    if (searchKey.value === '') {
      articleSearchList.value = articleList.value;
    }
    if (searchKey.value) {
      articleSearchList.value = articleList.value.filter((item) => searchKey.value && item?.title.includes(searchKey.value));
    }
    // console.log('articleList', articleList.value.length);
    // console.log('articleSearchList', articleSearchList.value.length);
  },
);


defineOptions({
  options: {
    styleIsolation: 'shared', // 或者 "shared"
  },
});
const goods = ref<goodInfo[]>([]);
const loadMoreArticles = async (page: number = 1, page_size: number = 10) => {
  // 使用支持分页的接口
  // const next = await getRecommenedArticles();
  // if (page === 1) {
  //   // 第一页，替换数据
  //   articleList.value = next;
  // } else {
  //   // 后续页，追加数据
  //   articleList.value = [...articleList.value, ...next];
  // }
  // articleSearchList.value = articleList.value;
  // return next; // 返回结果，让 useScrollView 判断是否还有更多数据
  return []
};
onLoad(async () => {
  // 使用分页接口加载第一页数据
  const firstPage = await getRecommenedArticles();
  articleList.value = firstPage;
  articleSearchList.value = articleList.value;
  await getGoodsInfo(1, 10).then((res) => {
    goods.value = res;
  });
});
</script>

<style lang="scss">
.title {
  margin-left: 16rpx;
  margin-top: 20rpx;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 90rpx);
  min-height: 0; // allow flex children like scroll-view to shrink

  &__head {
    //#ifdef MP-WEIXIN
    margin-top: 0rpx;
    //#endif
  }

  .waterfall {
    padding: 0.2rem 0.3rem !important;
  }
}

// #ifdef H5
.content__head {
  order: 2;
}

.scroll-Y {
  order: 3;
}

// #endif

@media screen and (min-width: 600px) {
  .content__head {
    display: none;
  }
}

// #ifdef MP-WEIXIN



//</style>
