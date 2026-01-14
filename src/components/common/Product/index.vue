<template>
  <view class="product-container">
    <image :src="'/static/product/product-1.png'" lazy-load mode="aspectFill" class="product-container__image"></image>
    <view class="product-container__info">
      <text class="product-container__info--name">商品名称</text>
    </view>
  </view>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.product-container {
  width: 300rpx;
  height: 180rpx;
  border-radius: 14px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 20rpx 0;

  &__image {
    width: 100%;
    height: 100%;
    background-color: rgb(156, 167, 203);
    border-radius: 14px;
    position: relative;
    box-shadow: 0 0 10px rgb(235, 161, 198);
    margin-bottom: 10rpx;
    z-index: 1;
  }

  &__info {
    text-align: center;

    &--name {
      font-size: 26rpx;
      letter-spacing: 2rpx;
      line-height: 1;
    }
  }

}
</style>
