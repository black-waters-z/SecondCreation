<template>
  <view class="ai-room-container w-100">
    <view class="ai-room-container__room-info w-100">
      <view class="ai-room-container__room-info__title">
        <text class="text"> 房间名称 </text></view
      >
      <view class="ai-room-container__room-info__owner">
        <image
          class="ai-room-container__room-info__owner__avatar"
          src="#"
          mode="scaleToFill"
        />
        <text class="ai-room-container__room-info__owner__name"
          ><text class="text">房主</text></text
        >
      </view>
      <view class="ai-room-container__room-info__content">
        <text class="text">房间内容房间内容房间内容房间内容房间</text></view
      >
    </view>
  </view>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.text {
  display: block;
  overflow: hidden;
  width: 100%;
  font-weight: 400;
  color: $text-muted;
}
.ai-room-container {
  height: 200rpx;
  border-radius: 30rpx;
  background-color: $pink-50;
  border: 1px solid $border-color;
  position: relative;

  &__room-info {
    position: absolute;
    bottom: 0;
    background: linear-gradient(to top, #ffffff, #ffffffcc, #ffffff00);
    backdrop-filter: blur(10rpx); // 添加这行代码
    box-sizing: border-box;
    padding: 5rpx 20rpx;
    &__title {
      font-size: 26rpx;

      .text {
        font-weight: 600;
        color: $text-title;
      }
    }

    &__content {
      font-size: 20rpx;
      width: 100%;
      display: none;

      .text {
        text-overflow: ellipsis;
        text-indent: 2em;
      }
    }

    &__owner {
      font-size: 24rpx;
      height: 30rpx;
      display: flex;
      align-items: center;

      &__avatar {
        width: 25rpx;
        height: 25rpx;
        background-color: rgb(175, 131, 131);
        border-radius: 50%;
      }

      &__name {
        margin-left: 6rpx;
        .text {
          font-size: x-small;
        }
      }
    }
  }
}

@media screen and (min-width: 600px) {
  .ai-room-container {
    cursor: pointer;
    border: none;
    height: 300rpx;
    &:hover .ai-room-container__room-info {
      background-color: white;
      animation: roomInfoExpand 0.5s ease-in-out forwards;
      &__content {
        display: block;
      }
    }
  }
}

@keyframes roomInfoExpand {
  0% {
    height: 100rpx;
  }
  100% {
    height: 100%; // 最终高度
  }
}
</style>
