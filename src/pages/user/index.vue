<template>
  <view class="w-full index-container content">
    <head-nav class="w-full"></head-nav>
    <scroll-container class="w-full flex mh-0">
      <view class="content__user">
        <user-bar :user-info="userInfo"></user-bar>
        <support-pay></support-pay>
      </view>
      <view class="content__read-nav">
        <read-nav :nav-items="readNavItems" color="black"> </read-nav>
        <up-line dashed color="#ffecef"></up-line>
        <read-nav :nav-items="writeNavItems" color="black"> </read-nav>
      </view>
    </scroll-container>
    <post-sheet class="w-full"></post-sheet>
    <post-sheet-show></post-sheet-show>
    <match-media :min-width="600" class="item-center">
      <ask-ai></ask-ai>
    </match-media>
  </view>
</template>

<script setup lang="ts">
import PostSheet from '@/components/common/PostSheet/index.vue';
import PostSheetShow from '@/components/common/PostSheet/PostSheetShow.vue';
import UserBar from './components/UserBar.vue';
import SupportPay from './components/SupportPay.vue';
import ReadNav from './components/ReadNav.vue';
import HeadNav from '@/components/common/HeadNav.vue';
import AskAi from './components/AskAi.vue';
import ScrollContainer from '@/components/common/ScrollContainer/index.vue';
import type { UserInfo } from './type';
import { onLoad } from '@dcloudio/uni-app';
import { navigateToLogin } from '@/utils/navigate';
import { parseToken } from '@/utils/security';
import { ref } from 'vue';
import IntroductionNav from '@/components/base/IntroductionNav/index.vue';
const userInfo = ref<UserInfo>();
enum NavLabelEnum {
  HISTORY = '历史记录',
  FAVORITE = '收藏',
  LIKE = '喜欢',
  ARTICLE_MANAGE = '文章管理',
  DRAFT = '草稿箱',
  ARTICLE_DATA = '文章数据',
}

const readNavItems = [
  { icon: '\ue63b', label: NavLabelEnum.HISTORY, type: 'HistoryComponent' },
  { icon: '\ue634', label: NavLabelEnum.FAVORITE, type: 'FavoriteComponent' },
  { icon: '\ue635', label: NavLabelEnum.LIKE, type: 'LikeComponent' },
];

const writeNavItems = [
  { icon: '\ue652', label: NavLabelEnum.ARTICLE_MANAGE },
  { icon: '\ue64f', label: NavLabelEnum.DRAFT },
  { icon: '\ue627', label: NavLabelEnum.ARTICLE_DATA },
];

onLoad(() => {
  const token = uni.getStorageSync('token');
  if (!token) {
    navigateToLogin();
  }
  const user = parseToken(token);
  userInfo.value = {
    id: user.uid,
    name: user.sub,
  };
});
</script>

<style lang="scss">
.content {
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
    box-sizing: border-box;
  }
}

@media screen and (min-width: 600px) {
  .index-container {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 20px;
  }
}
</style>
