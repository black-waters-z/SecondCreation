<template>
  <view>
    <go-back :title="goBackTitle"></go-back>
    <!-- #ifdef H5 -->
    <component :is="component ?? null"></component>
    <!-- #endif -->
    <!-- #ifdef MP-WEIXIN  -->
    <FavoriteComponent
      v-if="componentKey === 'FavoriteComponent'"
    ></FavoriteComponent>
    <LikeComponent v-if="componentKey === 'LikeComponent'"></LikeComponent>
    <history-component
      v-if="componentKey === 'HistoryComponent'"
    ></history-component>
    <!-- #endif -->
  </view>
</template>

<script setup lang="ts">
import GoBack from "@/components/common/GoBack.vue";
import { onLoad } from "@dcloudio/uni-app";
import { ref, shallowRef } from "vue";

const goBackTitle = ref("");
onLoad((options) => {
  goBackTitle.value = decodeURIComponent(options?.goBackTitle);
});

// #ifdef H5
import { componentMap, type componentKey } from "./index";
const component = shallowRef<(typeof componentMap)[componentKey] | null>(null);
let key = ref<componentKey>();
onLoad((options) => {
  key.value = options?.icon as componentKey | undefined;
  component.value = key.value ? componentMap[key.value] : null;
});
// #endif

// #ifdef MP-WEIXIN
import FavoriteComponent from "@/components/icon/FavoriteComponent/index.vue";
import LikeComponent from "@/components/icon/LikeComponent/index.vue";
import HistoryComponent from "@/components/icon/HistoryComponent/index.vue";
let componentKey = ref("");
onLoad((options) => {
  componentKey.value = options?.icon;
  console.log(componentKey.value);
});
// #endif
</script>

<style lang="scss" scoped>
:deep(.content) {
  // #ifdef MP-WEIXIN
  padding-top: 150rpx;
  height: calc(100vh - 150rpx);

  // #endif
  // #ifdef H5
  padding-top: 80rpx;
  height: calc(100vh - 80rpx);
  // #endif
}
</style>
