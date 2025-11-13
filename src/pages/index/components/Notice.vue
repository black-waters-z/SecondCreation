<template>
  <view class="notice">
    <text>通知:</text>
    <view class="notices">
      <text
        v-for="(item, idx) in noticesList"
        :key="idx"
        class="one-notice"
        :style="noticeTransformStyle"
        >{{ item }}</text
      >
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
const noticesList = ref([
  "这是一则通知信息1",
  "这是一则通知信息2",
  "这是一则通知信息3",
]);

const noticeIndex = ref(0);
const noticeTransformStyle = computed(() => ({
  transform: `translateY(-${noticeIndex.value * 100}%)`,
}));
let noticeTimer: ReturnType<typeof setInterval> | null = null;

onMounted(async () => {
  noticeTimer = setInterval(() => {
    noticeIndex.value =
      noticeIndex.value % noticesList.value.length ==
      noticesList.value.length - 1
        ? 0
        : noticeIndex.value + 1;
  }, 10000);
});

onUnmounted(async () => {
  if (noticeTimer) {
    clearInterval(noticeTimer);
    noticeTimer = null;
  }
});
</script>

<style scoped lang="less">
.notice {
  width: 95vw;
  border-radius: 1000px;
  display: flex;
  align-items: center;
  font-size: 25rpx;
  margin-top: 10rpx;

  :first-child {
    margin: 0;
    padding: 0;
  }

  .notices {
    flex: 1;
    margin: 0 10rpx;
    height: 30rpx;
    background-color: white;
    display: flex;
    flex-direction: column;
    text-align: left;
    overflow: hidden;
    padding: 0rpx 10rpx;
    border: 3rpx solid white;
    border-radius: 1000px;
    color: rgb(244, 143, 177);
    .one-notice {
      width: 100%;
      height: 30rpx;
      line-height: 30rpx;
      transition: 0.3s;
    }
  }
}
</style>
