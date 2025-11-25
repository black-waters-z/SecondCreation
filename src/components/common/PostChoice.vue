<template>
  <view
    class="post-choice"
    :style="{ backgroundColor: backgroundcolor }"
    @click="navigateTo"
  >
    <slot name="icon"> </slot>
    <text v-if="text" class="text">
      {{ text }}
    </text>
  </view>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ text?: string; backgroundcolor: string }>(), {
  backgroundcolor: "antiquewhite",
});

function navigateTo() {
  console.log("跳转到发布页面哦哦!");
}
</script>

<style scoped>
.post-choice {
  width: 100rpx;
  height: 100rpx;
  padding: 20rpx;
  border-radius: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10rpx;
}

.text {
  font-size: 20rpx;
}
</style>
