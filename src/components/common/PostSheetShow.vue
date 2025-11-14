<template>
  <view>
    <!-- #ifdef MP-WEIXIN  -->
    <button class="middle-button" @click="clickMiddleButton">
      <b>{{ buttonText }}</b>
    </button>
    <!-- #endif -->
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
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
  aspect-ratio: 1/1;
  text-align: center;
  border-radius: 1000rpx;
  background-color: white;
}

.middle-button:active {
  background-color: antiquewhite;
}
</style>
