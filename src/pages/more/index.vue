<template>
  <view class="content">
    <head-nav></head-nav>
    <common-swiper
      :styles="{ width: '100vw', height: '30vw' }"
      :swiper-info="swiperInfo"
      class="nomobile-disappear"
    ></common-swiper>
    <MoreNavigatorBar> </MoreNavigatorBar>
    <ai-room-nav class="ai-room"></ai-room-nav>
  </view>
</template>

<script setup lang="ts">
import MoreNavigatorBar from "./components/MoreNavigatorBar.vue";
import CommonSwiper from "@/components/common/CommonSwiper.vue";
import HeadNav from "@/components/common/HeadNav.vue";
import AiRoomNav from "./components/AiRoomNav.vue";
const swiperInfo = [
  {
    swiperImg: "/static/homepic/homepic3.png",
  },
  {
    swiperImg: "/static/homepic/homepic2.png",
  },
];
</script>

<style lang="scss" scoped>
.ai-room {
  width: 98%;
}
</style>
