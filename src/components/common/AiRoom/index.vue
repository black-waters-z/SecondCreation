<template>
  <view class="ai-room-container w-100">
    <view class="ai-room-container__room-info w-100">
      <view class="ai-room-container__room-info__title">房间名称</view>
      <view class="ai-room-container__room-info__content">房间内容</view>
      <view class="ai-room-container__room-info__owner">
        <image
          class="ai-room-container__room-info__owner__avatar"
          src="#"
          mode="scaleToFill"
        />
        <text class="ai-room-container__room-info__owner__name">房主</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.ai-room-container {
  height: 200rpx;
  border-radius: 30rpx;
  background-color: aquamarine;
  position: relative;

  &__room-info {
    position: absolute;
    bottom: 0;
    background: linear-gradient(to top, #ffffff, #ffffffcc, #ffffff99);

    &__title {
      font-size: 30rpx;
      font-weight: bold;
    }

    &__content {
      font-size: 20rpx;
    }

    &__owner {
      font-size: 24rpx;
      height: 30rpx;
      display: flex;
      align-items: center;

      &__avatar {
        width: 30rpx;
        height: 30rpx;
        background-color: rgb(175, 131, 131);
        border-radius: 50%;
      }

      &__name {
        margin-left: 6rpx;
      }
    }
  }
}
</style>
