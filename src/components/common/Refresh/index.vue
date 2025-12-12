<template>
  <view class="refresh-container">
    <view class="circle"> </view>
    <text>加载中...</text>
  </view>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
.refresh-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .circle {
    width: 40rpx;
    height: 40rpx;
    border-radius: 50%;
    border: 2px solid pink;
    border-top: 2px solid var(--pink-color);
    animation: refresh 1s infinite;
    margin-right: 20rpx;
  }
}

@keyframes refresh {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media screen and (min-width: 600px) {
  .refresh-container {
    background-color: white;
  }
}
</style>
