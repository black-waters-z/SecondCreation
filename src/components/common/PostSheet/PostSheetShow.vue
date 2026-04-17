<template>
  <view>
    <!-- #ifdef MP-WEIXIN  -->
    <view class="middle-button" @click="clickMiddleButton">
      <b>{{ buttonText }}</b>
    </view>
    <!-- #endif -->
  </view>
</template>

<script setup lang="ts">


defineOptions({
  options: {
    virtualHost: true,
  },
});import { ref } from "vue";
import { usePostSheetStore } from "@/store/usePostSheet";
const postSheetStore = usePostSheetStore();
const buttonText = ref("+");
const { toggle } = postSheetStore;
const clickMiddleButton = function () {
  toggle();
  buttonText.value = buttonText.value == "+" ? "-" : "+";
};
</script>

<style lang="scss" scoped>
.middle-button {
  position: fixed;
  right: -20rpx;
  bottom: 150rpx;
  transform: translateY(50%);
  z-index: 2000;
  width: 100rpx;
  height: 100rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1/1;
  text-align: center;
  border-radius: 1000rpx;
  background-color: white;
}

.middle-button:active {
  background-color: antiquewhite;
}
</style>
