<template>
  <view class="w-full index-container">
    <view class="w-full">
      <head-nav class="w-full"></head-nav>
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
    <match-media :min-width="600" class="item-center">
      <ask-ai></ask-ai>
    </match-media>
  </view>
</template>

<script setup lang="ts">
import PostSheet from "@/components/common/PostSheet/index.vue";
import PostSheetShow from "@/components/common/PostSheet/PostSheetShow.vue";
import UserBar from "./components/UserBar.vue";
import SupportPay from "./components/SupportPay.vue";
import ReadNav from "./components/ReadNav.vue";
import HeadNav from "@/components/common/HeadNav.vue";
import AskAi from "./components/AskAi.vue";
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
  { icon: "\ue63b", label: NavLabelEnum.HISTORY, type: "HistoryComponent" },
  { icon: "\ue634", label: NavLabelEnum.FAVORITE, type: "FavoriteComponent" },
  { icon: "\ue635", label: NavLabelEnum.LIKE, type: "LikeComponent" },
];

const writeNavItems = [
  { icon: "\ue652", label: NavLabelEnum.ARTICLE_MANAGE },
  { icon: "\ue64f", label: NavLabelEnum.DRAFT },
  { icon: "\ue627", label: NavLabelEnum.ARTICLE_DATA },
];
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  // #ifdef MP-WEIXIN
  margin-top: 80rpx;
  // #endif

  &__user {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    padding-bottom: 20rpx;
    position: relative;
  }

  &__read-nav {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}

@media screen and (min-width: 600px) {
  .index-container {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 20px;
  }
}

// #ifdef MP-WEIXIN
.index-container {
  margin-top: 80rpx;
}
// #endif
</style>
