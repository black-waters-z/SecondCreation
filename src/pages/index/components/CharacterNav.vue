<template>
  <view class="character-nav-container">
    <view v-for="(value, index) in characters" class="character-div" :key="index + 4"
      @tap="goToCharacter(index, value.navigatorUrl)">

      <view class="character-nav-container__navigator"
        :class="{ 'active': tabBarStore.activeTabBarIndex == index + 4 }">
        <text class="character-name">{{ value.name }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useTabBarStore } from "@/store/useNav";
const tabBarStore = useTabBarStore();
const { changeTabBarIndex } = tabBarStore;
const characters = [
  {
    name: 'tag导航',
    avatar: '/static/avatar/avatar1.jpg',
    navigatorUrl: '/pages/tagNav/index',
  },
  { name: '粮仓导航', avatar: '/static/avatar/avatar1.jpg' },
  { name: '火热合集', avatar: '/static/avatar/avatar1.jpg' },
  { name: '官方公告', icon: '\ue600' },
  { name: '搜索', icon: '\ue60d', navigatorUrl: '/pages/search/index' },
];

function goToCharacter(index: number, url?: string) {
  const nextIndex = index + 4;
  changeTabBarIndex(nextIndex);
  if (url) {
    uni.navigateTo({ url });
  }
}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: CustomFont;
  src: url('../../../static/iconfont.ttf');
}

.character-nav-container {
  width: calc(100% - 20rpx);
  border-radius: 16rpx;
  margin-top: 10rpx;
  gap: 20rpx;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 10rpx;

  .character-div {
    flex: 1;
    margin-left: 10rpx;
    width: 100rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .character-avatar {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    &__image {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .character-name {
    font-size: 28rpx;
    line-height: 1.4;
  }
}

@media screen and (min-width: 600px) {
  .character-nav-container {
    transition: all 0.3s ease-in-out;

    .active {
      color: $pink-400;
      border-radius: 100px;

      .character-name {
        border-left: 10rpx solid $pink-300;
        padding-left: 20rpx;
        font-weight: 600;
      }
    }

    .character-div {
      width: 100%;
      flex-direction: row;

      .character-name {
        flex: 1;
        margin-left: 20px;
        font-size: 30rpx;
      }
    }

    .character-nav-container__navigator {
      font-weight: 400;
      padding: 10rpx 30rpx;
      width: 130px;
      letter-spacing: 4rpx;


      &:hover {
        font-weight: 600;
        cursor: pointer;
        border-radius: 100px;
        color: $pink-400;

        .character-name {
          border-left: 10rpx solid $pink-300;
          padding-left: 20rpx;
        }
      }
    }

    :deep(.navigator-wrap) {
      display: flex;
      align-items: center;
    }
  }
}

.icon-class {
  color: pink !important;
}
</style>
