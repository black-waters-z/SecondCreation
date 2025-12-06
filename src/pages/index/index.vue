<template>
  <view class="content">
    <head-nav></head-nav>
    <view class="content__head">
      <common-swiper></common-swiper>
    </view>
    <match-media :max-width="599" style="width: 95%; margin: 0 auto">
      <character-nav></character-nav>
    </match-media>
    <!-- 窄屏瀑布流 -->
    <scroll-view
      :scroll-top="scrollTop"
      scroll-y="true"
      class="mobile-scroll scroll-Y"
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
        <refresh></refresh>
      </template>
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
import PostSheet from "@/components/common/PostSheet.vue";
import PostSheetShow from "@/components/common/PostSheetShow.vue";
import HeadNav from "@/components/common/HeadNav.vue";
import CharacterNav from "./components/CharacterNav.vue";
import WaterFall from "@/components/common/WaterFall.vue";
import Refresh from "@/components/common/Refresh/index.vue";

if (process.env.NODE_ENV === "development") {
  console.log(import.meta.env.DEV);
  console.log("开发环境");
} else {
  console.log("生产环境");
}

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
.scroll-Y {
  flex: 1;
  min-height: calc(100vh - 220rpx);
}

::v-deep .waterfall {
  padding-top: 20rpx !important;
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
</style>
