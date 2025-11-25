<template>
  <view class="content">
    <head-nav></head-nav>
    <view> </view>
    <view class="content__head">
      <uni-swiper-dot
        :info="info"
        :current="current"
        field="content"
        :mode="mode"
        :dotsStyles="dotStyles"
      >
        <swiper
          class="swiper-box"
          autoplay
          circular
          interval="3000"
          duration="500"
          @change="change"
        >
          <swiper-item v-for="(item, index) in info" :key="index">
            <image mode="aspectFill" class="swiper-item" :src="item.content">
            </image>
          </swiper-item>
        </swiper>
      </uni-swiper-dot>
    </view>
    <!-- #ifdef H5 -->
    <search-bar></search-bar>
    <!-- #endif -->
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
import Foot from "@/components/common/Foot.vue";
import Hot from "./components/Hot.vue";
import PostSheet from "@/components/common/PostSheet.vue";
import PostSheetShow from "@/components/common/PostSheetShow.vue";
// #ifdef H5
import SearchBar from "@/components/common/SearchBar.vue";
// #endif
import HeadNav from "@/components/common/HeadNav.vue";
import CharacterNav from "./components/CharacterNav.vue";

const dotStyles = {
  color: "pink",
  backgroundColor: "grey",
  border: "grey",
  selectedBackgroundColor: "pink",
  selectedBorder: "pink",
};

const info = ref([
  { content: "/static/homepic/homepic3.png" },
  { content: "/static/homepic/homepic2.png" },
]);
const current = ref(0);
const mode = ref<"round" | "round-dot">("round"); // keep whatever modes you use

const change = (e: any) => {
  current.value = e.detail.current;
};

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
