<template>
  <scroll-view scroll-y="true" class="mobile-scroll scroll-Y w-100" style="height: 100%; flex: 1; min-height: 0"
    refresher-enabled="true" refresher-default-style="none" :refresher-triggered="triggered" :refresher-threshold="120"
    refresher-background="rgb(248, 248, 248)" @refresherpulling="onPulling" @refresherrefresh="onRefresh"
    @refresherrestore="onRestore" @refresherabort="onAbort" @scrolltolower="onEnd">
    <template #refresher>
      <refresh class="w-100" :type="refreshType"></refresh>
    </template>
    <slot></slot>
    <have-no-more v-if="have_no_more"></have-no-more>
  </scroll-view>
</template>

<script setup lang="ts">
import { useScrollView } from '@/hooks/useScrollView';
import Refresh from '../Refresh/index.vue';
import HaveNoMore from '@/components/base/HaveNoMore/index.vue'
withDefaults(defineProps<{ have_no_more?: boolean }>(), {
  have_no_more: false
})
const { triggered, refreshType, onEnd, onPulling, onRefresh, onAbort, onRestore } = useScrollView();
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
    padding: 0 20px;
  }
}
</style>
