<template>
  <view class="store-content">
    <head-nav></head-nav>
    <head-bar></head-bar>
    <Filter v-model="filterIndex"></Filter>
    <view style="width: 100%; overflow-y: scroll">
      <articles
        :zone="activeNavigatorIndex"
        style="width: 100%"
        :styles="{
          'grid-template-columns': isMobile
            ? 'repeat(2, 1fr)'
            : 'repeat(5, 1fr)',
        }"
      ></articles>
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
