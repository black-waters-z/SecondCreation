<template>
  <view class="character-nav-container">
    <view v-for="(value, index) in characters" class="character-div">
      <navigator :url="value.navigatorUrl" hover-class="navigator-hover">
        <view class="character-avatar">
          <image
            v-if="value.avatar"
            :src="value.avatar"
            mode="scaleToFill"
            class="character-avatar__image"
          />
          <uni-icons
            fontFamily="CustomFont"
            :color="value.color"
            size="25"
            v-if="value.icon"
          >
            {{ value.icon }}
          </uni-icons>
        </view>
      </navigator>
      <text class="character-name">{{ value.name }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
const characters = [
  {
    name: "角色百科",
    avatar: "/static/avatar/avatar1.jpg",
    navigatorUrl: "/pages/character/index",
  },
  { name: "粮仓导航", avatar: "/static/avatar/avatar1.jpg" },
  { name: "火热合集", avatar: "/static/avatar/avatar1.jpg" },
  { name: "官方公告", icon: "\ue600", color: "#ffc0cb" },
  { name: "搜索", icon: "\ue60d", color: "#ffc0cb" },
];
</script>

<style lang="scss" scoped>
@font-face {
  font-family: CustomFont;
  src: url("../../../static/iconfont.ttf");
}
.character-nav-container {
  width: 100%;
  // #ifdef MP-WEIXIN
  width: calc(98vw - 20rpx);
  // #endif
  border-radius: 16rpx;
  background-color: white;
  margin-top: 10rpx;
  gap: 20rpx;
  display: flex;
  flex-direction: row !important;
  justify-content: flex-start;
  padding: 10rpx;

  .character-div {
    flex: 1;
    margin-left: 10rpx;
    width: 100rpx;
    height: 100rpx;
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
    font-weight: 800;

    &__image {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .character-name {
    font-size: 20rpx;
    line-height: 1.4;
  }
}
</style>
