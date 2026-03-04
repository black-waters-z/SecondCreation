<template>
  <view class="to-top-container" @click="scrollTop">
    <uni-icons type="arrow-up" color="white" size="24" />
  </view>
</template>

<script lang="ts" setup>
import { inject } from 'vue';
import { ScrollViewKey, useScrollView } from '@/hooks/useScrollView';

const injectedScrollView = inject(ScrollViewKey, null);
const { scrollTop } = injectedScrollView ?? useScrollView();
</script>

<style scoped lang="scss">
.to-top-container {
  z-index: 200;
  position: fixed;
  width: 100rpx;
  height: 100rpx;
  background-color: black;
  opacity: 0.2;
  border-radius: 1000rpx;
  right: 30rpx;
  bottom: 400rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
