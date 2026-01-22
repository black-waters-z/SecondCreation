<template>
  <view class="post-choice" :style="{ backgroundColor: backgroundcolor }" @click="navigateTo">
    <slot name="icon"> </slot>
    <text v-if="text" class="text" :style="{ color: fontColor }">
      {{ text }}
    </text>
  </view>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ text?: string; backgroundcolor: string; url: string; fontColor: string }>(), {
  backgroundcolor: 'antiquewhite',
  fontColor: 'black',
});

function navigateTo() {
  uni.navigateTo({
    url: props.url,
  });
}
</script>

<style scoped>
.post-choice {
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
  margin-top: 10rpx;
}
</style>
