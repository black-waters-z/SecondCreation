<template>
  <view class="content">
    <head-nav></head-nav>
    <view> </view>
    <view class="content__head">
      <common-swiper></common-swiper>
    </view>
    <character-nav></character-nav>
    <hot :hot-title="HotTime.day"> </hot>
    <hot :hot-title="HotTime.week"> </hot>
    <hot :hot-title="HotTime.month"> </hot>
    <foot />
    <post-sheet></post-sheet>
    <post-sheet-show></post-sheet-show>
  </view>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { HotTime, ArticleModule } from "./types/index";
import CommonSwiper from "@/components/common/CommonSwiper.vue";
import Foot from "@/components/common/Foot.vue";
import Hot from "./components/Hot.vue";
import PostSheet from "@/components/common/PostSheet.vue";
import PostSheetShow from "@/components/common/PostSheetShow.vue";
import HeadNav from "@/components/common/HeadNav.vue";
import CharacterNav from "./components/CharacterNav.vue";

if (process.env.NODE_ENV === "development") {
  console.log(import.meta.env.DEV);
  console.log("开发环境");
} else {
  console.log("生产环境");
}

onMounted(async () => {
  // 切换成底部tab的时候head的active要消失
});
</script>

<style scoped lang="scss">
@media screen and (max-width: 600px) {
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

  .swiper-box {
    width: 100vw;
    height: 60vw;
  }

  .swiper-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .navigation-img {
    width: 16vw;
    height: 16vw;
  }

  .navigation text {
    margin-top: 10rpx;
  }
}

@media screen and (min-width: 600px) {
  .swiper-box {
    width: 600px;
    height: 360px;
    border-radius: 12rpx;
  }

  .swiper-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    border-radius: 18px;
  }
}
</style>
