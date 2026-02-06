<template>
  <view class="character-nav-container">
    <view v-for="(value, index) in characters" class="character-div" :key="index + 4"
      @tap="goToCharacter(index, value.navigatorUrl)">
      <view class="character-nav-container__navigator"
        :class="{ 'active': tabBarStore.activeTabBarIndex == index + 4 }">
        <uni-icons fontFamily="CustomFont" :size="20">{{ value.icon }}</uni-icons>
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
    name: 'tag',
    avatar: '/src/static/avatar/avatar1.jpg',
    navigatorUrl: '/pages/tagNav/index',
  },
  { name: '粮仓', avatar: '/src/static/avatar/avatar1.jpg' },
  { name: '合集', avatar: '/src/static/avatar/avatar1.jpg' },
  { name: '公告', icon: '\ue600' },
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
  box-sizing: border-box;
  padding: 50rpx;

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
      transition: all 0.3s ease-in-out;
      border-radius: 100px;
      background-color: $uni-bg-color-grey;

      .character-name {}
    }

    .character-div {
      width: 100%;
      flex-direction: row;

      .character-name {
        flex: 1;
        margin-left: 20px;
        font-size: 18px;
      }
    }

    .character-nav-container__navigator {
      font-weight: 600;
      padding: 10rpx 30rpx;
      width: 130px;
      color: $text-main;

      &:hover {
        transition: all 0.3s ease-in-out;
        cursor: pointer;
        border-radius: 100px;
        background-color: $uni-bg-color-grey;

        .character-name {}
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
