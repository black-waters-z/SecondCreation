<template>
  <view class="content w-full">
    <head-nav v-if="showHead"></head-nav>
    <!-- #ifdef MP-WEIXIN -->
    <head-nav></head-nav>
    <!-- #endif -->
    <slot></slot>
    <scroll-container :have_no_more="have_no_more" class="w-full flex-1 mh-0" :enable_refresher="enable_refresh"
      :fetch-data="fetchData">
      <slot name="scroll"></slot>
    </scroll-container>
    <slot name="bottom"></slot>
  </view>
</template>

<script setup lang="ts">
import HeadNav from '../common/HeadNav.vue';
import ScrollContainer from '../common/ScrollContainer/index.vue';
withDefaults(defineProps<{
  showHead?: boolean;
  have_no_more?: boolean;
  enable_refresh?: boolean;
  fetchData?: (page: number, page_size?: number) => void | Promise<void>;
}>(), {
  enable_refresh: true,
});
</script>

<style lang="scss" scoped>
.content {
  // #ifdef MP-WEIXIN
  height: 100vh;
  // #endif
}
</style>
