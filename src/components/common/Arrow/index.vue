<template>
  <view class="product-arrow-view" @tap="handleTap">
    <uni-icons type="left" size="20"></uni-icons>
  </view>
</template>
<script setup lang="ts">
const emit = defineEmits(["click"]);
const handleTap = (e: Event) => emit("click", e);
</script>
<style lang="scss" scoped>
.product-arrow-view {
  width: 70rpx;
  height: 70rpx;
  background-color: white;
  opacity: 0.7;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
}
</style>
