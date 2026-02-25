<template>
  <view class="user-bar-container">
    <image class="user-bar-container__avatar" :src="userInfo?.avatar_url" mode="aspectFill"
      :class="{ 'no-login-grey': !userInfo?.avatar_url }">
      <uni-icons fontFamily="CustomFont" color="white" size="24"> &#xe61c; </uni-icons>
    </image>
    <mobile-user-info :userInfo="userInfo"></mobile-user-info>
    <not-mobile-user-info v-if="!isMobile" :userInfo="userInfo"></not-mobile-user-info>
  </view>
</template>

<script setup lang="ts">
import type { UserInfo } from '../type';
import MobileUserInfo from './UserInfo/MobileUserInfo.vue';
import NotMobileUserInfo from './UserInfo/NotMobileUserInfo.vue';
import { isMobile } from '../../../utils';
defineProps<{ userInfo: UserInfo }>();
</script>

<style scoped lang="scss">
@font-face {
  font-family: CustomFont;
  src: url('../../../static/iconfont.ttf');
}

.user-bar-container {
  border-radius: 16rpx;
  display: flex;
  flex-direction: row;
  padding-bottom: 20rpx;
  box-sizing: border-box;
  padding: 0 20rpx;
  position: relative;
  z-index: 1000;

  &__avatar {
    width: 130rpx;
    height: 130rpx;
    border-radius: 1000rpx;
    display: flex;
    margin-top: 20rpx;
    align-items: center;
    justify-content: center;
  }

  .no-login-grey {
    background-color: grey;
    opacity: 0.5;
    cursor: pointer;
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
        margin-left: 10rpx;
      }
    }
  }
}

@media screen and (max-width:600px) {
  .user-bar-container {
    width: 100%;
  }
}
</style>
