<template>
  <view class="post-comment-container">
    <view class="post-comment-container__text-area">
      <view class="comment">发评论</view>
      <button class="button">发送</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";

const value = ref("");
</script>

<style lang="scss" scoped>
.post-comment-container {
  width: 100vw;
  height: 100rpx;
  display: flex;
  justify-content: center;

  &__text-area {
    width: 98vw;
    height: 70rpx;
    border-radius: 16rpx;
    display: flex;

    .comment {
      flex: 1;
      height: 60rpx;
      background-color: white;
      border-radius: 16rpx;
      margin-left: 20rpx;
      margin-right: 20rpx;
      display: flex;
      align-items: center;
      padding-left: 10rpx;
    }

    .button {
      border: none;
      font-size: 28rpx;
      border-radius: 16rpx;
      background-color: grey;
      color: white;
      height: 60rpx;
      display: flex;
      align-items: center;

      :hover {
        opacity: 0.5;
      }
    }
  }
}
</style>
