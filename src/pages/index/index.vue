<template>
  <view class="content">
    <!-- 首页头部 -->
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
      <home-product></home-product>
      <water-fall :waterFallColNum="2"></water-fall>
    </scroll-container>

    <!-- 宽屏瀑布流 -->
    <match-media :min-width="600" style="width: 100%">
      <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y">
        <template #refresher>
          <refresh></refresh>
        </template>
        <water-fall :waterFallColNum="5"></water-fall>
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
const old = reactive({
  scrollTop: 0,
});

const triggered = ref<string | boolean>(false);
let _freshing = false;

const onPulling = (e: Event) => {
  // console.log("onpulling", e);
};

// 这里之后加刷新的接口，推荐算法，
const onRefresh = () => {
  if (_freshing) return;
  _freshing = true;
  console.log('刷新');
  setTimeout(() => {
    triggered.value = false;
    _freshing = false;
  }, 3000);
};

const onRestore = () => {
  triggered.value = 'restore'; // 需要重置
  console.log('onRestore');
};

const onAbort = () => {
  console.log('onAbort');
};

onMounted(() => {
  _freshing = false;
  setTimeout(() => {
    triggered.value = true;
  }, 1000);
});

onMounted(async () => {});
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
  // #ifdef MP-WEIXIN
  margin-top: 80rpx;
  // #endif
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

// #endif
</style>
