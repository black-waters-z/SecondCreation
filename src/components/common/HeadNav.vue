<template>
  <!-- #ifdef MP-WEIXIN -->
  <view class="status_bar"> </view>
  <view class="bar"> </view>
  <!-- #endif -->
</template>

<style scoped lang="scss">
.status_bar {
  width: 100vw;
  z-index: 1000;
  position: fixed;
  top: 0;
  min-height: 80rpx;
  background-image: linear-gradient(
    180deg,
    rgba(245, 193, 215, 1) 0%,
    rgb(255, 255, 255) 100%
  );
  left: 0;
}
</style>
