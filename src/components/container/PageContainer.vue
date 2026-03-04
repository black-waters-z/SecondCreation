<template>
  <view class="w-full page-container__box">
    <top-window></top-window>
    <view class="content page-container w-full h-100">
      <head-nav v-if="showHead"></head-nav>
      <!-- #ifdef MP-WEIXIN -->
      <head-nav></head-nav>
      <!-- #endif -->
      <view class="flex w-full h-100" :class="{ 'flex-row': flexRow, 'flex-column': !flexRow }">
        <slot></slot>
        <scroll-container :have_no_more="have_no_more" class="w-full flex-1 mh-0" :enable_refresher="enable_refresh"
          :fetch-data="fetchData">
          <slot name="scroll"></slot>
        </scroll-container>
        <slot name="bottom"></slot>
      </view>
    </view>
  </view>

</template>

<script setup lang="ts">
import { TimeFilter } from '@/types';
import HeadNav from '../common/HeadNav.vue';
import ScrollContainer from '../common/ScrollContainer/index.vue';
import { type Article } from '@/pages/tagPage/type';
import { provide } from 'vue';
import topWindow from '../responsive/top-window.vue';
import { ScrollViewKey, useScrollView } from '@/hooks/useScrollView';

const props = withDefaults(defineProps<{
  showHead?: boolean;
  have_no_more?: boolean;
  enable_refresh?: boolean;
  flexRow?: boolean;
  fetchData?: (page: number, page_size?: number, timefilter?: TimeFilter) => Article[] | Promise<Article[]>;
}>(), {
  enable_refresh: true,
});

// 朝内部provide了一个scrollView的hook
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

.page-container__box {
  display: flex;
  flex-direction: column;
  height: 100%;
}

@media screen and (min-width:600px) {
  .page-container {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .page-container__box {
    display: flex;
    flex-direction: column;
  }
}
</style>
