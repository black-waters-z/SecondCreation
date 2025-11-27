<template>
  <view @click="goBack" class="go-back-container">
    <uni-icons type="left" size="30"></uni-icons>
    <view class="go-back-container__title">{{ title }}</view>
  </view>
</template>

<script setup lang="ts">
function goBack() {
  uni.navigateBack();
}

withDefaults(defineProps<{ title?: string }>(), {
  title: "",
});
</script>

<style scoped lang="scss">
// #ifdef MP-WEIXIN
$go-back-container__top: 80rpx;
// #endif

// #ifdef H5
$go-back-container__top: 0rpx;
// #endif

.go-back-container {
  width: calc(100vw - 20rpx);
  display: flex;
  justify-content: flex-start !important;
  align-items: flex-start !important;
  padding: {
    top: 20rpx;
    left: 20rpx;
  }
  background-color: white;
  position: fixed;
  z-index: 1000;
  top: $go-back-container__top;
  left: 0;

  &__title {
    position: absolute;
    margin-left: 50%;
    transform: translateX(-50%);
  }
}
</style>
