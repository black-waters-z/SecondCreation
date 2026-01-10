<template>
  <view class="refresh-container">
    <view class="w-full flex justify-center" v-if="type === 'PullDown'">
      <up-icon size="25" name="arrow-downward"></up-icon>&nbsp;&nbsp;
      <view class="pull-down"> </view>
      <text v-for="(value, index) in '下拉刷新页面内容'" :class="`fade-text-${index % 2}`">{{ value }}</text>
    </view>
    <view class="w-full flex justify-center" v-if="type === 'Loading'">
      <up-loading-icon></up-loading-icon>&nbsp;&nbsp;
      <view class="pull-down"> </view>
      <text v-for="(value, index) in '正在加载'" :class="`fade-text-${index % 2}`">{{ value }}</text>
    </view>
    <view class="w-full flex justify-center" v-if="type === 'Restore'">
      <up-icon size="25" name="arrow-upward"></up-icon>&nbsp;&nbsp;
      <view class="pull-down"> </view>
      <text v-for="(value, index) in '加载成功'" :class="`fade-text-${index % 2}`">{{ value }}</text>
    </view>
  </view>
</template>
<script setup lang="ts">
withDefaults(defineProps<{ type: string }>(), { type: 'Restore' });
</script>
<style scoped lang="scss">
.refresh-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80rpx;
  .circle {
    width: 40rpx;
    height: 40rpx;
    border-radius: 50%;
    border: 2px solid pink;
    border-top: 2px solid $pink-color;
    animation: refresh 1s infinite;
    margin-right: 20rpx;
  }
  .pull-down {
  }

  .fade-text-0 {
    transition: color 0.5s ease-in-out;
    color: gray;
    animation: colorTransition1 1s infinite alternate;
  }

  .fade-text-1 {
    transition: color 0.5s ease-in-out;
    color: darkgray;
    animation: colorTransition2 1s infinite alternate;
  }
}

@keyframes refresh {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes colorTransition1 {
  0% {
    color: gray; /* 浅灰色 */
  }
  50% {
    color: rgb(119, 118, 118); /* 浅灰色 */
  }
  100% {
    color: darkgray; /* 深灰色 */
  }
}

@keyframes colorTransition2 {
  0% {
    color: darkgray; /* 浅灰色 */
  }
  50% {
    color: rgb(119, 118, 118); /* 浅灰色 */
  }
  100% {
    color: gray; /* 深灰色 */
  }
}

@media screen and (min-width: 600px) {
  .refresh-container {
    background-color: white;
  }
}
</style>
