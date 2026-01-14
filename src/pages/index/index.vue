<template>
  <view class="content">
    <!-- 首页头部 -->
    <!-- #ifdef MP-WEIXIN -->
    <head-nav></head-nav>
    <!-- #endif -->
    <head-nav show-search class="position-sticky top-0 z-100"></head-nav>

    <!-- #ifdef MP-WEIXIN -->
    <match-media :max-width="599" class="w-full position-sticky top-80 bg-white z-100">
      <character-nav class="character-nav"></character-nav>
    </match-media>
    <!-- #endif -->

    <!-- 窄屏瀑布流 -->
    <scroll-container class="w-full flex-1 mh-0">
      <!-- #ifdef H5 -->
      <view class="content__head">
        <common-swiper></common-swiper>
      </view>
      <!-- #endif -->
      <!-- 这里插入商品信息 -->
      <IntroductionNav>同人团宣</IntroductionNav>
      <home-product></home-product>
      <introduction-nav>推荐</introduction-nav>
      <water-fall :waterFallColNum="2" :article-lists="articleList"></water-fall>
    </scroll-container>

    <!-- 宽屏瀑布流 -->
    <match-media :min-width="600" style="width: 100%">
      <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y">
        <template #refresher>
          <refresh></refresh>
        </template>
        <water-fall :waterFallColNum="5" :article-lists="articleList"></water-fall>
      </scroll-view>
    </match-media>
    <post-sheet class="w-full"></post-sheet>
    <post-sheet-show></post-sheet-show>
  </view>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
// #ifdef H5
import CommonSwiper from '@/components/common/CommonSwiper.vue';
// #endif
import PostSheet from '@/components/common/PostSheet/index.vue';
import PostSheetShow from '@/components/common/PostSheet/PostSheetShow.vue';
import HeadNav from '@/components/common/HeadNav.vue';
import CharacterNav from './components/CharacterNav.vue';
import WaterFall from '@/components/common/WaterFall.vue';
import Refresh from '@/components/common/Refresh/index.vue';
import HomeProduct from './components/HomeProduct.vue';
import ScrollContainer from '@/components/common/ScrollContainer/index.vue';
import IntroductionNav from '@/components/base/IntroductionNav/index.vue';
import { onLoad } from '@dcloudio/uni-app';
import { getRecommenedArticles } from '@/api/articleApi'
import type { Article } from '../tagPage/type';
if (process.env.NODE_ENV === 'development') {
  console.log(import.meta.env.DEV);
  console.log('开发环境');
} else {
  console.log('生产环境');
}

defineOptions({
  options: {
    styleIsolation: 'shared', // 或者 "shared"
  },
});
const scrollTop = ref(0);
const articleList = ref<Article[]>([])
onLoad(async () => {
  articleList.value = await getRecommenedArticles()
})

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

@media screen and (min-width: 600px) {
  .content {
    position: relative;

    &__head {
      display: none;
    }

    .mobile-scroll {
      display: none;
    }
  }

  .uni-scroll-view-refresher {
    background-color: white !important;
  }
}

// #ifdef H5
.content__head {
  order: 2;
}

.scroll-Y {
  order: 3;
}

// #endif</style>
