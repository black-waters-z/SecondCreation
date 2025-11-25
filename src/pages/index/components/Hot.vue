<template>
  <view class="hot-container">
    <view class="title">
      <uni-title
        type="h5"
        :title="hotTitle"
        align="left"
        color="black"
      ></uni-title>
      <uni-icons type="fire-filled" size="15" color="black"> </uni-icons>
    </view>
    <div class="hot-articles">
      <Articles :zone="0"></Articles>
    </div>
  </view>
</template>
<script setup lang="ts">
import { HotTime } from "../types/index";
import Articles from "@/components/common/Articles.vue";
withDefaults(defineProps<{ hotTitle: HotTime }>(), {
  hotTitle: HotTime.day,
});
</script>

<style lang="scss" scoped>
.hot-container {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  display: flex;
  align-items: center;
  color: black;
  font-family: var(--text-title-family);
  font-size: 20rpx;
}

/* #ifdef H5 */
@media screen and (min-width: 767px) {
  .title {
    font-size: 30rpx;
  }
}
/* #endif */
</style>
