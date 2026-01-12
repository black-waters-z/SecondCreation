<template>
  <view class="content w-100">
    <head-nav class="w-full"></head-nav>
    <scroll-container class="store-content__scroll flex-1 mh-0">
      <active-nav type="icon" class="w-full">已筛选</active-nav>
      <Filter v-model="filterIndex" class="w-full"></Filter>
      <articles :zone="activeNavigatorIndex" :styles="{
        'grid-template-columns': isMobile ? 'repeat(2, minmax(0, 1fr))' : 'repeat(5, minmax(0, 1fr))',
      }"></articles>
    </scroll-container>
    <to-top></to-top>
    <post-sheet class="w-full"></post-sheet>
    <post-sheet-show></post-sheet-show>
  </view>
</template>

<script setup lang="ts">
import ActiveNav from '@/components/common/ActiveNav/index.vue';
import Articles from '@/components/common/Articles.vue';
import PostSheet from '@/components/common/PostSheet/index.vue';
import PostSheetShow from '@/components/common/PostSheet/PostSheetShow.vue';
import HeadNav from '@/components/common/HeadNav.vue';
import ToTop from '@/components/common/ToTop.vue';
import Filter from '@/components/common/Filter.vue';
import ScrollContainer from '@/components/common/ScrollContainer/index.vue';
import { useHeadBarStore } from '@/store/useHeadBar';
import { onLaunch, onShow } from '@dcloudio/uni-app';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
const { activeNavigatorIndex } = storeToRefs(useHeadBarStore());
onShow(() => {
  if (activeNavigatorIndex.value === -1) activeNavigatorIndex.value = 0;
});
const info = uni.getSystemInfoSync();
const isMobile = info.platform === 'android' || info.platform === 'ios' || info.deviceType === 'phone' || info.windowWidth <= 600;

const filterIndex = ref<number>(0);
</script>

<style lang="scss">
.scroll-Y {
  flex: 1;
}

.content {
  height: calc(100vh - 90rpx);
}

.store-container {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
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
