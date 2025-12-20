<template>
  <head-nav></head-nav>
  <scroll-view
    :scroll-top="scrollTop"
    scroll-y="true"
    class="mobile-scroll scroll-Y w-100"
    refresher-enabled="true"
    refresher-default-style="none"
    :refresher-triggered="triggered"
    :refresher-threshold="100"
    refresher-background="rgb(248, 248, 248)"
  >
    <template #refresher>
      <refresh class="w-100"></refresh>
    </template>
    <MoreNavigatorBar> </MoreNavigatorBar>
    <ai-room-nav class="ai-room"></ai-room-nav>
  </scroll-view>
</template>

<script setup lang="ts">
import MoreNavigatorBar from "./components/MoreNavigatorBar.vue";
import HeadNav from "@/components/common/HeadNav.vue";
import AiRoomNav from "./components/AiRoomNav.vue";
import Refresh from "@/components/common/Refresh/index.vue";
import { ref } from "vue";
const swiperInfo = [
  {
    swiperImg: "/static/homepic/homepic3.png",
  },
  {
    swiperImg: "/static/homepic/homepic2.png",
  },
];

const triggered = ref<string | boolean>(false);
</script>

<style lang="scss">
.ai-room {
  width: 98%;
  margin: 0 auto;
}

.scroll-Y {
  height: calc(100vh - 80rpx);

  // #ifdef MP-WEIXIN
  margin-top: 80rpx;
  // #endif
  .uni-scroll-view-content {
  }
  .bar {
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 1000;
  }
}
</style>
