<template>
  <scroll-view enable-flex scroll-y="true" class="mobile-scroll scroll-Y w-100"
    style="height: 100%; flex: 1; min-height: 0" :scroll-top="scrollToTop" :refresher-enabled="enable_refresher"
    refresher-default-style="none" @scroll="onScroll" :refresher-triggered="triggered" :refresher-threshold="120"
    refresher-background="rgb(248, 248, 248)" @refresherpulling="onPulling" @refresherrefresh="onRefresh"
    @refresherrestore="onRestore" @refresherabort="onAbort" @scrolltolower="onEnd" scroll-with-animation>
    <template v-if="enable_refresher" #refresher>
      <refresh class="w-100" :type="refreshType"></refresh>
    </template>
    <slot></slot>
    <have-no-more v-if="have_no_more"></have-no-more>
  </scroll-view>
</template>

<script setup lang="ts">


defineOptions({
  options: {
    virtualHost: true,
  },
});import { useScrollView, ScrollViewKey } from '@/hooks/useScrollView';
import Refresh from '../Refresh/index.vue';
import HaveNoMore from '@/components/base/HaveNoMore/index.vue'
import { type Article } from '@/pages/tagPage/type';
import { inject } from 'vue';
import { type ManageArticle } from '@/components/icon/ArticleManagerComponent/type';
import { type CollectionData } from '../UserInfoCollections/type';
const props = withDefaults(
  defineProps<{
    have_no_more?: boolean;
    enable_refresher?: boolean;
    use_inject?: boolean;
    fetchData?: (page: number, page_size?: number) => Article[] | ManageArticle[] | CollectionData[] | Promise<Article[] | ManageArticle[] | CollectionData[]>;
  }>(),
  {
    have_no_more: false,
    enable_refresher: true,
    use_inject: true,
  }
);
// 获取和按钮共享的scrollViewHook的实例
const injectedScrollView = inject(ScrollViewKey, null);
const scrollView = (props.use_inject && injectedScrollView) ? injectedScrollView : useScrollView(props.fetchData);
const { triggered, refreshType, scrollToTop, onEnd, onPulling, onRefresh, onAbort, onRestore, onScroll } = scrollView;

</script>

<style lang="scss" scoped>
.scroll-Y {
  flex: 1;
  height: 100%;
}

:deep(.uni-scroll-view-refresher) {
  max-height: 120px;

  .uni-scroll-view-refresher-container {
    display: flex;
    justify-content: center;
  }
}

@media screen and (min-width: 600px) {
  .mobile-scroll {
    box-sizing: border-box;
    padding: 0 100px;
    height: 100%;
    position: relative;
  }
}
</style>
