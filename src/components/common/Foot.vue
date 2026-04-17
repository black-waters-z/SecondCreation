<template>
  <view class="foot-container"></view>
</template>

<script setup lang="ts">

defineOptions({
  options: {
    virtualHost: true,
  },
});</script>

<style lang="less" scoped>
.foot-container {
  width: 100%;
  height: 40rpx;
  background-color: var(--grey-background-color);
}
</style>
