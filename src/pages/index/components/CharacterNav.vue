<template>
  <view class="character-nav-container">
    <view v-for="(value, index) in characters" class="character-div">
      <navigator :url="value.navigatorUrl" hover-class="navigator-hover" class="character-nav-container__navigator">
        <text class="character-name">{{ value.name }}</text>
      </navigator>
    </view>
  </view>
</template>

<script setup lang="ts">
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
      padding: 10rpx 30rpx;
      width: 130px;

      &:hover {
        background-color: $navigation-hover-color;
        cursor: pointer;
        border-radius: 100px;
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
