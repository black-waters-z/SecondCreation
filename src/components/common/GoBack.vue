<template>
  <view @click="goBack" class="go-back-container">
    <uni-icons type="left" size="30"></uni-icons>
  </view>
</template>

<script setup lang="ts">
function goBack() {
  uni.navigateBack();
}
</script>

<style scoped lang="scss">
.go-back-container {
  width: calc(100vw - 20rpx);
  justify-content: flex-start !important;
  align-items: flex-start !important;
  padding: {
    top: 20rpx;
    left: 20rpx;
  }
  background-color: white;
  position: fixed;
  z-index: 2000;
}
</style>
