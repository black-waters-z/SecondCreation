<template>
  <view class="content w-full">
    <head-nav v-if="showHead"></head-nav>
    <slot></slot>
    <scroll-container :have_no_more="have_no_more" class="w-full flex-1 mh-0">
      <slot name="scroll"></slot>
    </scroll-container>
    <slot name="bottom"></slot>
  </view>
</template>

<script setup lang="ts">
import HeadNav from '../common/HeadNav.vue';
import ScrollContainer from '../common/ScrollContainer/index.vue';
defineProps<{
  showHead?: boolean;
  have_no_more?: boolean;
}>();
</script>

<style lang="scss" scoped>
.content {
  // #ifdef MP-WEIXIN
  height: 100vh;
  // #endif
}
</style>
