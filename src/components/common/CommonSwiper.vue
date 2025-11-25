<template>
  <view>
    <uni-swiper-dot
      :info="info"
      :current="current"
      field="content"
      :mode="mode"
      :dotsStyles="dotStyles"
    >
      <swiper
        class="swiper-box"
        :style="{ ...styles }"
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
</template>

<script setup lang="ts">
import { ref } from "vue";
withDefaults(
  defineProps<{
    styles?: {
      width: string;
      height: string;
    };
  }>(),
  {
    styles: () => ({ width: "100vw", height: "60vw" }),
  }
);
const dotStyles = {
  color: "pink",
  backgroundColor: "grey",
  border: "grey",
  selectedBackgroundColor: "pink",
  selectedBorder: "pink",
};

const current = ref(0);
const mode = ref<"round" | "round-dot">("round"); // keep whatever modes you use

const change = (e: any) => {
  current.value = e.detail.current;
};
const info = ref([
  { content: "/static/homepic/homepic3.png" },
  { content: "/static/homepic/homepic2.png" },
]);
</script>

<style lang="scss" scoped>
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
