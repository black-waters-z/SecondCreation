<template>
  <view class="character-nav-container">
    <view v-for="(value, index) in characters" class="character-div">
      <navigator url="/pages/character/index" hover-class="navigator-hover">
        <view class="character-avatar">
          <image
            v-if="value.avatar"
            :src="value.avatar"
            mode="scaleToFill"
            class="character-avatar__image"
          />
        </view>
      </navigator>
      <text class="character-name">{{ value.name }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
const characters = [
  { name: "甘织玲奈子", avatar: "/static/avatar/avatar1.jpg" },
  { name: "濑名紫阳花", avatar: "/static/avatar/avatar3.jpg" },
  { name: "甘织玲奈子", avatar: "/static/avatar/avatar1.jpg" },
  { name: "濑名紫阳花", avatar: "/static/avatar/avatar3.jpg" },
  { name: "甘织玲奈子", avatar: "/static/avatar/avatar1.jpg" },
];
</script>

<style lang="scss" scoped>
.character-nav-container {
  width: calc(95vw - 20rpx);
  border-radius: 16rpx;
  background-color: white;
  margin-top: 10rpx;
  gap: 20rpx;
  display: flex;
  flex-direction: row !important;
  justify-content: center;
  padding: 10rpx;

  .character-div {
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
    border-radius: 1000rpx;

    &__image {
      width: 100%;
      height: 100%;
      border-radius: 1000rpx;
    }
  }

  .character-name {
    font-size: 20rpx;
    line-height: 1;
  }
}
</style>
