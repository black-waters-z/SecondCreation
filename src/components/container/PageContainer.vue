<template>
  <view class="content w-full">
    <head-nav v-if="showHead"></head-nav>
    <slot></slot>
    <scroll-container class="w-full flex-1 mh-0">
      <slot name="scroll"></slot>
    </scroll-container>
  </view>
</template>

<script setup lang="ts">
import HeadNav from '../common/HeadNav.vue';
import ScrollContainer from '../common/ScrollContainer/index.vue';
defineProps<{
  showHead?: boolean;
}>();
</script>

<style lang="scss" scoped>
.content {
  // #ifdef MP-WEIXIN
  height: 100vh;
  // #endif
}
</style>
