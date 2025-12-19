<template>
  <view class="product-container">
    <image :src="''" class="product-container__image"></image>
    <view class="product-container__info">
      <text class="product-container__info--name">商品名称</text>
      <text class="product-container__info--info">商品介绍</text>
    </view>
  </view>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.product-container {
  width: 300rpx;
  height: 200rpx;
  border-radius: 14px;
  background-color: grey;
  position: relative;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  &__image {
    width: 100%;
    height: 100%;
    background-color: rgb(156, 167, 203);
    border-radius: 14px;
    position: relative;
    z-index: 1;
  }

  &__info {
    position: absolute;
    width: 120rpx;
    height: 200rpx;
    background-color: white;
    border-top-right-radius: 14px;
    border-bottom-right-radius: 14px;

    top: 0;
    right: 0;
    z-index: 2;

    &--name {
      padding: {
        top: 6rpx;
        left: 10rpx;
        right: 10rpx;
        bottom: 3rpx;
      }
      font-size: 25rpx;
      font-weight: 500;
      color: $text-title;
    }
    &--info {
      padding: {
        left: 10rpx;
        right: 10rpx;
      }
      font-size: 22rpx;
      font-weight: 300;
      color: $text-muted;
    }
  }
}
</style>
