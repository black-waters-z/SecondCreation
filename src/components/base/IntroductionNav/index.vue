<template>
  <view class="w-full introduction-nav">
    <text class="introduction-nav__text">
      <slot></slot>
    </text>
    <view class="flex-1 introduction-nav__icon">
      <navigator :url="navigatorHref ?? '/'"> <up-icon bold name="arrow-right-double" size="15"></up-icon> </navigator>
    </view>
  </view>
</template>

<script setup lang="ts">
defineProps<{ navigatorHref?: String }>();
</script>

<style lang="scss" scoped>
.introduction-nav {
  display: flex;
  &__text {
    font-size: 25rpx;
    margin-left: 10rpx;
  }
  &__icon {
    display: flex;
    justify-content: flex-end;
    margin-right: 10rpx;
  }
}
</style>
