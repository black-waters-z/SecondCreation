<template>
  <view class="w-100 content">
    <head-nav class="w-full bg-white position-sticky top-0"></head-nav>
    <scroll-container class="w-full flex-1 mh-0">
      <ai-room-nav class="ai-room"></ai-room-nav>
    </scroll-container>
  </view>
</template>

<script setup lang="ts">
import HeadNav from '@/components/common/HeadNav.vue';
import AiRoomNav from './components/AiRoomNav.vue';
import ScrollContainer from '@/components/common/ScrollContainer/index.vue';
</script>

<style lang="scss">
.ai-room {
  width: 98%;
  margin: 0 auto;
}

.scroll-Y {
  .uni-scroll-view-content {
  }
  .bar {
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 1000;
  }
}
</style>
