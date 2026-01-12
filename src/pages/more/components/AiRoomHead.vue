<template>
  <view class="w-100 ai-room-head">
    <text>ai聊天室</text>
    <view class="ai-room-head__search">
      <input class="ai-room-head__search-input" placeholder="搜索" />
      <uni-icons type="search" color="" size="24" class="icon" />
    </view>
  </view>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.ai-room-head {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  height: 44px;
  background-color: white;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 20rpx;
  // #ifdef MP-WEIXIN
  margin-top: 80rpx;
  // #endif

  &__search {
    height: 100%;
    display: flex;
    align-items: center;
  }

  &__search-input {
    width: 400rpx;
    // #ifdef MP-WEIXIN
    width: 200rpx;
    // #endif
    height: 30rpx;
    padding-left: 10rpx;
    padding-right: 10rpx;
    border: 3px solid $text-main;
    border-radius: 1000px;
    margin-left: 50rpx;
  }
}
</style>
