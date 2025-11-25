<template>
  <view class="store-content">
    <head-nav></head-nav>
    <head-bar></head-bar>
    <Filter v-model="filterIndex"></Filter>
    <view class="store-container">
      <articles :zone="activeNavigatorIndex"></articles>
    </view>
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
import HeadNav from "@/components/common/HeadNav.vue";
import ToTop from "@/components/common/ToTop.vue";
import Filter from "@/components/common/Filter.vue";
import { useHeadBarStore } from "@/store/useHeadBar";
import { onLaunch, onShow } from "@dcloudio/uni-app";
import { storeToRefs } from "pinia";
import { ref } from "vue";
const { activeNavigatorIndex } = storeToRefs(useHeadBarStore());
onShow(() => {
  if (activeNavigatorIndex.value === -1) activeNavigatorIndex.value = 0;
});

const filterIndex = ref<number>(0);
</script>

<style lang="scss" scoped>
.store-content {
  width: 100vw;
  margin-top: 140rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  // #ifdef MP-WEIXIN
  margin-top: 240rpx;
  // #endif
}
.store-container {
  width: 100vw;
  display: flex;
  justify-content: center;
}
</style>
