<template>
  <view class="content">
    <!-- 首页头部 -->
    <head-nav show-search></head-nav>
    <!-- #ifdef MP-WEIXIN -->
    <match-media :max-width="599" style="margin-top: 70rpx" class="nav">
      <character-nav class="character-nav"></character-nav>
    </match-media>
    <!-- #endif -->
    <!-- #ifdef H5 -->
    <match-media
      :max-width="599"
      style="width: 100%; margin: 0rpx auto"
      class="nav"
    >
      <image src="/static/logo.png" mode="scaleToFill" class="logo"></image>
      <uni-icons type="bars" size="30" @click="toggleMobileNav"></uni-icons>
      <uni-icons type="search" size="30"></uni-icons>
    </match-media>
    <character-mobile-nav
      :is-show="showMobileNav"
      @toggle-mobile-nav="toggleMobileNav"
    ></character-mobile-nav>
    <!-- #endif -->

    <!-- 窄屏瀑布流 -->
    <scroll-view
      :scroll-top="scrollTop"
      scroll-y="true"
      class="mobile-scroll scroll-Y w-100"
      refresher-enabled="true"
      refresher-default-style="none"
      :refresher-triggered="triggered"
      :refresher-threshold="100"
      refresher-background="rgb(248, 248, 248)"
      @refresherpulling="onPulling"
      @refresherrefresh="onRefresh"
      @refresherrestore="onRestore"
      @refresherabort="onAbort"
    >
      <template #refresher>
        <refresh class="w-100"></refresh>
      </template>
      <!-- #ifdef H5 -->
      <view class="content__head">
        <common-swiper></common-swiper>
      </view>
      <!-- #endif -->
      <!-- 这里插入商品信息 -->
      <home-product></home-product>
      <water-fall :waterFallColNum="2"></water-fall>
    </scroll-view>

    <!-- 宽屏瀑布流 -->
    <match-media :min-width="600" style="width: 100%">
      <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y">
        <template #refresher>
          <refresh></refresh>
        </template>
        <water-fall :waterFallColNum="5"></water-fall>
      </scroll-view>
    </match-media>
    <post-sheet></post-sheet>
    <post-sheet-show></post-sheet-show>
  </view>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import CommonSwiper from "@/components/common/CommonSwiper.vue";
import PostSheet from "@/components/common/PostSheet/index.vue";
import PostSheetShow from "@/components/common/PostSheet/PostSheetShow.vue";
import HeadNav from "@/components/common/HeadNav.vue";
import CharacterNav from "./components/CharacterNav.vue";
import WaterFall from "@/components/common/WaterFall.vue";
import Refresh from "@/components/common/Refresh/index.vue";
import HomeProduct from "./components/HomeProduct.vue";
import CharacterMobileNav from "./components/CharacterMobileNav.vue";

if (process.env.NODE_ENV === "development") {
  console.log(import.meta.env.DEV);
  console.log("开发环境");
} else {
  console.log("生产环境");
}
const showMobileNav = ref(false);

defineOptions({
  options: {
    styleIsolation: "shared", // 或者 "shared"
  },
});
const scrollTop = ref(0);
const old = reactive({
  scrollTop: 0,
});

function toggleMobileNav() {
  showMobileNav.value = !showMobileNav.value;
}

const triggered = ref<string | boolean>(false);
let _freshing = false;

const onPulling = (e: Event) => {
  // console.log("onpulling", e);
};

// 这里之后加刷新的接口，推荐算法，
const onRefresh = () => {
  if (_freshing) return;
  _freshing = true;
  console.log("刷新");
  setTimeout(() => {
    triggered.value = false;
    _freshing = false;
  }, 3000);
};

const onRestore = () => {
  triggered.value = "restore"; // 需要重置
  console.log("onRestore");
};

const onAbort = () => {
  console.log("onAbort");
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
.scroll-Y {
  flex: 1;
  min-height: calc(100vh - 350rpx);
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  // #ifdef MP-WEIXIN
  margin-top: 80rpx;
  // #endif
  height: calc(100vh - 80rpx);

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

// #ifdef MP-WEIXIN
.character-nav {
  position: fixed;
  top: 140rpx;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding-top: 10rpx;
}

.waterfall {
}

.scroll-Y {
  margin-top: 70rpx;
}
// #endif

// #ifdef H5
.content__head {
  order: 2;
}

.nav {
  order: 1;
  z-index: 100;
  position: relative;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .logo {
    width: 130rpx;
    height: 50rpx;
    float: left;
    margin-left: 20px;
    margin-top: 5px;
    margin-bottom: 5px;
    padding: 5px;
    background-color: rgb(255, 255, 255);
    border-radius: 30rpx;
    box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
    &::after {
      clear: both;
    }
  }

  .uni-icons {
    float: right;
    color: $text-muted !important;
    font-size: 25px !important;
    margin-right: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
}

.scroll-Y {
  order: 3;
}

// #endif
</style>
