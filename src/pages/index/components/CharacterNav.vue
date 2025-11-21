<template>
  <view class="character-nav-container">
    <view v-for="(value, index) in characters">
      <view class="character-avatar"> </view>
      <text class="character-name">{{ value.name }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
const characters = [
  { name: "character", avatar: "url" },
  { name: "character", avatar: "url" },
  { name: "character", avatar: "url" },
];
</script>

<style lang="scss" scoped>
.character-nav-container {
  width: calc(95vw - 20rpx);
  border-radius: 16rpx;
  background-color: white;
  margin-top: 10rpx;
  gap: 20rpx;
  display: flex;
  flex-direction: row !important;
  justify-content: flex-start !important;
  padding: 10rpx;

  .character-avatar {
    width: 80rpx;
    height: 80rpx;
    border-radius: 1000rpx;
    background-color: #dad7d7;
    margin-left: 10rpx;
  }

  .character-name {
    font-size: 23rpx;
  }
}
</style>
