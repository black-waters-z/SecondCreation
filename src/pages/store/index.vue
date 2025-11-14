<template>
  <view class="content">
    <head-bar></head-bar>
    <div class="store-container">
      <articles :zone="activeNavigatorIndex"></articles>
    </div>
    <to-top></to-top>
    <post-sheet></post-sheet>
    <post-sheet-show></post-sheet-show>
  </view>
</template>

<script setup lang="ts">
import HeadBar from "@/components/common/HeadBar.vue";
import Articles from "@/components/common/Articles.vue";
import PostSheet from "@/components/common/PostSheet.vue";
import PostSheetShow from "@/components/common/PostSheetShow.vue";
import ToTop from "@/components/common/ToTop.vue";
import { useHeadBarStore } from "@/store/useHeadBar";
import { onLaunch, onShow } from "@dcloudio/uni-app";
import { storeToRefs } from "pinia";
const { activeNavigatorIndex } = storeToRefs(useHeadBarStore());
onShow(() => {
  if (activeNavigatorIndex.value === -1) activeNavigatorIndex.value = 0;
});
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.store-container {
  // #ifdef MP-WEIXIN
  margin-top: 80rpx;
  // #endif
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
}
</style>
