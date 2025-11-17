<template>
  <view class="support-pay-container">
    <view class="text">
      <view class="support-pay-container__title">支持我们团队</view>
      <view class="support-pay-container__small-title">我们将不胜感激！</view>
    </view>
    <view>
      <button class="support-bt">点击支持</button>
    </view>
  </view>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.support-pay-container {
  margin-top: 20rpx;
  width: calc(98vw - 40rpx);
  background-color: rgba(255, 191, 202, 0.3);
  border-radius: 16rpx;
  padding: 15rpx 10rpx;
  display: flex;
  align-items: center;

  .text {
    width: 73%;
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
