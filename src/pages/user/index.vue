<template>
  <view class="content">
    <head-nav></head-nav>
    <view class="content__user">
      <user-bar></user-bar>
      <support-pay></support-pay>
    </view>
    <view class="content__read-nav">
      <read-nav :nav-items="readNavItems"> </read-nav>
      <text>创作中心</text>
      <read-nav :nav-items="writeNavItems"> </read-nav>
      <text>其他服务</text>
    </view>

    <post-sheet></post-sheet>
    <post-sheet-show></post-sheet-show>
  </view>
</template>

<script setup lang="ts">
import PostSheet from "@/components/common/PostSheet.vue";
import PostSheetShow from "@/components/common/PostSheetShow.vue";
import UserBar from "./components/UserBar.vue";
import SupportPay from "./components/SupportPay.vue";
import ReadNav from "./components/ReadNav.vue";
import HeadNav from "@/components/common/HeadNav.vue";

import { ref } from "vue";

const login = ref(false);

const readNavItems = [
  { icon: "\ue63b", label: "历史记录" },
  { icon: "\ue634", label: "收藏" },
  { icon: "\ue635", label: "喜欢" },
];

const writeNavItems = [
  { icon: "\ue652", label: "文章管理" },
  { icon: "\ue64f", label: "草稿箱" },
  { icon: "\ue627", label: "文章数据" },
];
</script>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  // #ifdef MP-WEIXIN
  margin-top: 80rpx;
  // #endif

  &__user {
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    padding-bottom: 20rpx;
  }

  &__read-nav {
    display: flex;
    flex-direction: column;
  }
}
</style>
