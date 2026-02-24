<template>
  <view class="content page-container  w-full">
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
import { TimeFilter } from '@/types';
import HeadNav from '../common/HeadNav.vue';
import ScrollContainer from '../common/ScrollContainer/index.vue';
import { type Article } from '@/pages/tagPage/type';
import { provide } from 'vue';
import { ScrollViewKey, useScrollView } from '@/hooks/useScrollView';

const props = withDefaults(defineProps<{
  showHead?: boolean;
  have_no_more?: boolean;
  enable_refresh?: boolean;
  fetchData?: (page: number, page_size?: number, timefilter?: TimeFilter) => Article[] | Promise<Article[]>;
}>(), {
  enable_refresh: true,
});

const scrollView = useScrollView(props.fetchData);
provide(ScrollViewKey, scrollView);

defineExpose({
  scrollView,
});
</script>

<style lang="scss" scoped>
.content {
  // #ifdef MP-WEIXIN
  height: 100vh;
  // #endif
}
</style>
