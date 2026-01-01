<template>
  <view class="store-content w-100">
    <head-nav class="w-full"></head-nav>
    <active-nav type="icon"></active-nav>
    <head-bar></head-bar>
    <Filter v-model="filterIndex"></Filter>
    <articles
      :zone="activeNavigatorIndex"
      :styles="{
        'grid-template-columns': isMobile
          ? 'repeat(2, minmax(0, 1fr))'
          : 'repeat(5, minmax(0, 1fr))',
        'overflow-y': 'auto',
      }"
    ></articles>
    <to-top></to-top>
    <post-sheet></post-sheet>
    <post-sheet-show></post-sheet-show>
  </view>
</template>

<script setup lang="ts">
import ActiveNav from "@/components/common/ActiveNav/index.vue";
import Articles from "@/components/common/Articles.vue";
import PostSheet from "@/components/common/PostSheet/index.vue";
import PostSheetShow from "@/components/common/PostSheet/PostSheetShow.vue";
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
const info = uni.getSystemInfoSync();
const isMobile =
  info.platform === "android" ||
  info.platform === "ios" ||
  info.deviceType === "phone" ||
  info.windowWidth <= 600;

const filterIndex = ref<number>(0);
</script>

<style lang="scss" scoped>
.scroll-Y {
  flex: 1;
  min-height: calc(100vh - 220rpx);
}

.store-content {
  box-sizing: border-box;
  margin-top: 140rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  // #ifdef MP-WEIXIN
  margin-top: 240rpx;
  // #endif
}
.store-container {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  // #ifdef MP-WEIXIN
  margin-top: 80rpx;
  // #endif
  height: calc(100vh - 80rpx);

  &__head {
    //#ifdef MP-WEIXIN
    margin-top: 0rpx;
    //#endif
  }
}

@media screen and (min-width: 600px) {
  .store-content {
    height: 100%;
    margin-top: 0;
  }

  .uni-scroll-view-refresher {
    background-color: white !important;
  }
}
</style>
