<template>
  <view class="content">
    <uni-swiper-dot
      :info="info"
      :current="current"
      field="content"
      :mode="mode"
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
          <image class="swiper-item" src="@/static/homepic1.png"> </image>
        </swiper-item>
      </swiper>
    </uni-swiper-dot>
    <view class="navigation-module">
      <view class="navigation">
        <!-- <image class="navigation-img" src="@/static/paint.png" /> -->
        <uni-icons fontFamily="CustomFont" size="30" class="navigation__pink">
          {{ "&#xe6af;" }}
        </uni-icons>
        <text class="navigation-text">{{ ArticleModule.paint }}</text>
      </view>
      <view class="navigation">
        <!-- <image class="navigation-img" src="@/static/write.png" /> -->
        <uni-icons fontFamily="CustomFont" size="30" class="navigation__pink">
          {{ "&#xe782;" }}
        </uni-icons>
        <text class="navigation-text">{{ ArticleModule.write }}</text>
      </view>
      <view class="navigation">
        <!-- <image class="navigation-img" src="@/static/candy.png" /> -->
        <uni-icons fontFamily="CustomFont" size="30" class="navigation__pink">
          {{ "&#xe65b;" }}
        </uni-icons>
        <text class="navigation-text">{{ ArticleModule.candy }}</text>
      </view>
      <view class="navigation">
        <!-- <image class="navigation-img" src="@/static/communicate.png" /> -->
        <uni-icons fontFamily="CustomFont" size="30" class="navigation__pink">
          {{ "&#xe6f0;" }}
        </uni-icons>
        <text class="navigation-text">{{ ArticleModule.communicate }}</text>
      </view>
      <view class="navigation">
        <!-- <image class="navigation-img" src="@/static/video.png" /> -->
        <uni-icons fontFamily="CustomFont" size="30" class="navigation__pink">
          {{ "&#xe678;" }}
        </uni-icons>
        <text class="navigation-text">{{ ArticleModule.video }}</text>
      </view>
    </view>
    <notice></notice>
    <!-- #ifdef MP-WEIXIN  -->
    <button id="middle-button" @click="clickMiddleButton">
      <b>{{ buttonText }}</b>
    </button>
    <!-- #endif -->
    <hot :hot-title="HotTime.day"> </hot>
    <hot :hot-title="HotTime.week"> </hot>
    <hot :hot-title="HotTime.month"> </hot>
    <foot />
    <post-sheet></post-sheet>
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { apiRequest } from "@/utils/request";
import { HotTime, ArticleModule } from "./types/index";
import { usePostSheetStore } from "@/store/usePostSheet";
import Foot from "@/components/common/Foot.vue";
import Hot from "./components/Hot.vue";
import PostSheet from "@/components/common/PostSheet.vue";
import Notice from "./components/Notice.vue";
const postSheetStore = usePostSheetStore();
const buttonText = ref("+");
const { toggle } = postSheetStore;
const info = ref([
  { content: "内容 A" },
  { content: "内容 B" },
  { content: "内容 C" },
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
  // const result = await apiRequest("/health", { method: "GET" });
  // console.log("aaa", result);
});

const clickMiddleButton = function () {
  toggle();
  buttonText.value = buttonText.value == "+" ? "-" : "+";
};
</script>

<style scoped lang="scss">
@media screen and (max-width: 600px) {
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .navigation-text {
    font-size: 25rpx;
    color: var(--font-title-color);
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
    background-color: white;
  }

  .navigation-module {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 98%;
    margin-top: 10rpx;
    border-radius: 16rpx;
    background-color: white;
    padding: 10rpx 0 10rpx 0;
  }

  #middle-button {
    position: fixed;
    right: -20rpx;
    bottom: 150rpx;
    transform: translateY(50%);
    z-index: 2000;
    width: 100rpx;
    aspect-ratio: 1/1;
    text-align: center;
    border-radius: 1000rpx;
    background-color: white;
  }

  #middle-button:active {
    background-color: antiquewhite;
  }

  .navigation {
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 30rpx;
    font-weight: 700;
    font-family: var(--text-title-family);

    &__pink {
      color: var(--pink-color) !important;

      span {
        width: 100rpx;
      }
    }
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
    background-color: white;
    border-radius: 18px;
  }
}
</style>
