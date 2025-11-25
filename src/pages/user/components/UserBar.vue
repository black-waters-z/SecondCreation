<template>
  <view class="user-bar-container">
    <view class="user-bar-container__avatar no-login-grey">
      <uni-icons fontFamily="CustomFont" color="white" size="24">
        &#xe61c;
      </uni-icons>
    </view>
    <view class="user-info">
      <view class="user-info__name">
        <view>name&nbsp;&nbsp;</view>
        <uni-icons
          fontFamily="CustomFont"
          color="black"
          size="15"
          class="user-info__name__icon"
        >
          &#xe605;
        </uni-icons>
      </view>

      <view class="user-info__other">
        <view class="user-info__other__tag">总点击数 10000 </view>
        <view class="user-info__other__tag">总被收藏数 100 </view>
        <view class="user-info__other__tag">总粉丝 100 </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
defineProps();
</script>

<style scoped lang="scss">
@font-face {
  font-family: CustomFont;
  src: url("../../../static/iconfont.ttf");
}

.user-bar-container {
  width: 100vw;
  background-color: white;
  border-radius: 16rpx;
  display: flex;
  flex-direction: row;
  padding-bottom: 20rpx;

  &__avatar {
    width: 130rpx;
    height: 130rpx;
    background-color: antiquewhite;
    border-radius: 1000rpx;
    margin: 20rpx 0 0 20rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .no-login-grey {
    background-color: grey;
    opacity: 0.5;
  }

  .user-info {
    margin: 20rpx 0 0 20rpx;
    flex: 1;

    &__name {
      font-weight: 700;
      font-size: 40rpx;
      display: flex;
      align-items: first baseline;
      position: relative;

      &__icon {
        margin-right: 40rpx;
        top: 10rpx;
      }
    }

    &__other {
      display: flex;
      font-size: 18rpx;
      margin-top: 20rpx;

      &__tag {
        background-color: rgb(239, 236, 236);
        padding: 5rpx 10rpx;
        border-radius: 1000px;
      }
    }
  }
}
</style>
