<template>
  <view class="w-100">
    <head-nav></head-nav>
    <ai-room-head class="w-100"></ai-room-head>
    <scroll-view
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
      <ai-room-nav class="ai-room"></ai-room-nav>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import AiRoomHead from "./components/AiRoomHead.vue";
import HeadNav from "@/components/common/HeadNav.vue";
import AiRoomNav from "./components/AiRoomNav.vue";
import Refresh from "@/components/common/Refresh/index.vue";
import { useScrollView } from "@/hooks/useScrollView";

const swiperInfo = [
  {
    swiperImg: "/static/homepic/homepic3.png",
  },
  {
    swiperImg: "/static/homepic/homepic2.png",
  },
];

const { triggered, onPulling, onRefresh, onAbort, onRestore } = useScrollView();
</script>

<style lang="scss">
.ai-room {
  width: 98%;
  margin: 0 auto;
}

.scroll-Y {
  height: calc(100vh - 80rpx);

  .uni-scroll-view-content {
  }
  .bar {
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 1000;
  }
}

// #ifdef MP-WEIXIN
.scroll-Y {
  height: calc(100vh - 170rpx);
}
// #endif
</style>
