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
      <read-nav :nav-items="readNavItems"> </read-nav>
      <read-nav :nav-items="writeNavItems"> </read-nav>
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

enum NavLabelEnum {
  HISTORY = "历史记录",
  FAVORITE = "收藏",
  LIKE = "喜欢",
  ARTICLE_MANAGE = "文章管理",
  DRAFT = "草稿箱",
  ARTICLE_DATA = "文章数据",
}

const readNavItems = [
  { icon: "\ue63b", label: NavLabelEnum.HISTORY },
  { icon: "\ue634", label: NavLabelEnum.FAVORITE, type: "FavoriteComponent" },
  { icon: "\ue635", label: NavLabelEnum.LIKE, type: "LikeComponent" },
];

const writeNavItems = [
  { icon: "\ue652", label: NavLabelEnum.ARTICLE_MANAGE },
  { icon: "\ue64f", label: NavLabelEnum.DRAFT },
  { icon: "\ue627", label: NavLabelEnum.ARTICLE_DATA },
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
