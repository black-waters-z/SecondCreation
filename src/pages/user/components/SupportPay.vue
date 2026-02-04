<template>
  <view class="support-pay-container">
    <view class="text">
      <view class="support-pay-container__title">支持我们团队</view>
      <view class="support-pay-container__small-title">我们将不胜感激！</view>
    </view>
    <view>
      <SCButton type="outline" :style="{ fontSize: '26rpx' }">点击支持</SCButton>
    </view>
  </view>
</template>

<script setup lang="ts">
import SCButton from '@/components/common/SCButton/index.vue'
</script>

<style lang="scss" scoped>
.support-pay-container {
  margin-top: 20rpx;
  width: calc(98% - 40rpx);
  // #ifdef MP-WEIXIN
  width: calc(90vw - 20rpx);
  // #endif
  border-radius: 16rpx;
  padding: 15rpx 10rpx;
  display: flex;
  align-items: center;
  background-color: $uni-bg-color-grey;

  .text {
    flex: 1;
  }

  &__title {
    font-size: 30rpx;
    font-weight: 700;
  }

  &__small-title {
    font-size: 25rpx;
    color: grey;
  }

  .support-bt {
    border-radius: 1000rpx;
    border: none;
    font-size: 25rpx;
    font-weight: 700;
    background-color: white;
  }
}
</style>
