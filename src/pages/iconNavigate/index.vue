<template>
  <page-wrapper class="w-full">
    <head-nav class="w-full"></head-nav>
    <go-back :title="goBackTitle" class="w-full position-sticky top-0 z-100"></go-back>
    <!-- #ifdef H5 -->
    <component class="w-100 h-100 overflow-y-scroll w-full" :is="component ?? null"></component>
    <!-- #endif -->
    <!-- #ifdef MP-WEIXIN  -->
    <FavoriteComponent class="w-full" v-if="componentKey === 'FavoriteComponent'"></FavoriteComponent>
    <LikeComponent class="w-full" v-if="componentKey === 'LikeComponent'"></LikeComponent>
    <history-component class="w-full" v-if="componentKey === 'HistoryComponent'"></history-component>
    <!-- #endif -->
  </page-wrapper>
</template>

<script setup lang="ts">
import GoBack from '@/components/common/GoBack.vue';
import HeadNav from '@/components/common/HeadNav.vue';
import { onHide, onLoad, onShow } from '@dcloudio/uni-app';
import { ref, shallowRef } from 'vue';
import PageWrapper from '@/components/container/PageContainer.vue';
const goBackTitle = ref('');
onLoad((options) => {
  goBackTitle.value = decodeURIComponent(options?.goBackTitle);
});

// #ifdef H5
import { componentMap, type componentKey } from './index';
const component = shallowRef<(typeof componentMap)[componentKey] | null>(null);
let key = ref<componentKey>();
onLoad((options) => {
  key.value = options?.icon as componentKey | undefined;
  component.value = key.value ? componentMap[key.value] : null;
});

onShow(() => {
  if (typeof document !== 'undefined') {
    document.body.classList.add('hide-icon-navigate-window');
  }
});

onHide(() => {
  if (typeof document !== 'undefined') {
    document.body.classList.remove('hide-icon-navigate-window');
  }
});
// #endif

// #ifdef MP-WEIXIN
import FavoriteComponent from '@/components/icon/FavoriteComponent/index.vue';
import LikeComponent from '@/components/icon/LikeComponent/index.vue';
import HistoryComponent from '@/components/icon/HistoryComponent/index.vue';
let componentKey = ref('');
onLoad((options) => {
  componentKey.value = options?.icon;
  console.log(componentKey.value);
});
// #endif
</script>

<style lang="scss">
page {
  height: 100%;
}

uni-top-window {
  display: none !important;
  opacity: 0;
}

.uni-top-window--placeholder {
  height: 0 !important;
}

uni-left-window {
  display: none !important;
  opacity: 0;
}

/* Remove the left-nav gap when the left window is hidden. */
uni-content {
  width: 100% !important;
}

.go-back-container {
  display: none !important;
}
</style>
