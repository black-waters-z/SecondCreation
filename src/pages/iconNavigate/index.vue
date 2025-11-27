<template>
  <view>
    <go-back :title="'收藏'"></go-back>
  </view>
</template>

<script setup lang="ts">
import GoBack from "@/components/common/GoBack.vue";
import { onLoad } from "@dcloudio/uni-app"; // 导入onLoad生命周期
import * as ComponentMap from "./index";
import { shallowRef } from "vue";

onLoad((options) => {
  console.log(options?.icon);
  // 根据传参动态设置组件
});
</script>
