<template>
  <view
    class="post-choice"
    :style="{ backgroundColor: backgroundcolor }"
    @click="navigateTo"
  >
    <slot name="icon"> </slot>
    <text>
      {{ text }}
    </text>
  </view>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ text: string; backgroundcolor: string }>(), {
  text: "error",
  backgroundcolor: "antiquewhite",
});

function navigateTo() {
  console.log("跳转到发布页面哦哦!");
}
</script>

<style scoped>
.post-choice {
  width: 150rpx;
  height: 150rpx;
  padding: 20rpx;
  border-radius: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10rpx;
}
</style>
