<template>
  <PageWrapper class="user-index" show-head flex-row>
    <!-- 大屏 -->
    <view class="user-index__user">
      <user-bar :user-info="userInfo" class="mobile-user-info"></user-bar>
      <read-nav class="content__read-nav__article-manager mobile-user-info" :nav-items="readNavItems" color="black"
        v-model:iconIndx="iconIndx"> </read-nav>
    </view>
    <template #scroll>
      <view class="content__user">
        <user-bar :user-info="userInfo"></user-bar>
        <support-pay></support-pay>
      </view>
      <view class="w-full flex ">
        <view class="content__read-nav">

          <view class="flex" v-if="isMobile">
            <view class="content__read-nav__split"></view>
            <text class="content__read-nav__text">文章管理</text>
          </view>
          <match-media max-width="600px">
            <read-nav class="content__read-nav__article-manager" :nav-items="readNavItems" color="black"
              v-model:iconIndx="iconIndx"> </read-nav>
          </match-media>
          <view class="flex">
            <view class="content__read-nav__split" v-if="isMobile"></view>
            <text class="content__read-nav__text" v-if="isMobile">互动</text>
          </view>
          <read-nav class="content__read-nav__user-manager" v-if="isMobile" :nav-items="readNavItems_1" color="black">
          </read-nav>
          <view class="flex">
            <view class="content__read-nav__split" v-if="isMobile"></view>
            <text class="content__read-nav__text" v-if="isMobile">用户管理</text>
          </view>
          <read-nav class="content__read-nav__user-manager" v-if="isMobile" :nav-items="readNavItems_2" color="black">
          </read-nav>
        </view>
        <!-- #ifdef H5 -->
        <component :is="component" v-if="!isMobile" class="w-full"></component>
        <!-- #endif -->
      </view>
    </template>
    <post-sheet class="w-full"></post-sheet>
    <post-sheet-show></post-sheet-show>
  </PageWrapper>
</template>

<script setup lang="ts">
import PostSheet from '@/components/common/PostSheet/index.vue';
import PageWrapper from '@/components/container/PageContainer.vue';
import PostSheetShow from '@/components/common/PostSheet/PostSheetShow.vue';
import UserBar from './components/UserBar.vue';
import SupportPay from './components/SupportPay.vue';
import ReadNav from './components/ReadNav.vue';
import type { UserInfo } from './type';
import { onLoad } from '@dcloudio/uni-app';
import { navigateToLogin } from '@/utils/navigate';
import { ref, shallowRef } from 'vue';
import { isMobile } from '@/utils';
import { getUserMeInfo } from '@/api/userApi';

import { type componentKey, componentMap } from '@/pages/iconNavigate/index';
import { watch } from 'vue';

const userInfo = ref<UserInfo>();
enum NavLabelEnum {
  CONTACT_TO_ME = '互动消息',
  ATTENTION_TO_ME = '关注',

  HISTORY = '历史记录',
  FAVORITE = '我的收藏',
  LIKE = '我的喜欢',
  ARTICLE_MANAGE = '文章管理',
  DRAFT = '查看草稿',
  ARTICLE_DATA = '文章数据',
  PROBLEM_ANSWER = '问题反馈',
  PASSWORD_CHANGE = '修改密码',
  ABOUT_US = '关于我们',
  LOGOUT_ACCOUNT = '注销账户',
  USER_SETTING = '用户设置',
  LOGOUT = '退出登录',
  USER_COMMENT = '用户评论',
  USER_COMMENT_REPLY = '用户评论回复',
  USER_COMMENT_LIKE = '用户评论点赞',
  USER_COMMENT_FAVORITE = '用户收藏的评论',
}

const readNavItems = [

  { icon: '\ue63b', label: NavLabelEnum.HISTORY, type: 'HistoryComponent' },
  { icon: '\ue634', label: NavLabelEnum.FAVORITE, type: 'FavoriteComponent' },
  { icon: '\ue635', label: NavLabelEnum.LIKE, type: 'LikeComponent' },
  { icon: '\ue652', label: NavLabelEnum.ARTICLE_MANAGE, type: 'ArticleManagerComponent' },
  { icon: '\ue64f', label: NavLabelEnum.DRAFT, type: 'DraftComponent' },
  { icon: '\ue627', label: NavLabelEnum.ARTICLE_DATA, type: 'ArticleDataComponent' },
];

const iconIndx = ref(0);

const readNavItems_1 = [
  { icon: '\ue63b', label: NavLabelEnum.CONTACT_TO_ME, type: 'ContactToMeComponent' },
  { icon: '\ue634', label: NavLabelEnum.ATTENTION_TO_ME, type: 'AttentionComponent' },

]

const readNavItems_2 = [
  { label: NavLabelEnum.USER_SETTING, type: 'SettingComponent' },
  { label: NavLabelEnum.PROBLEM_ANSWER, type: 'ProblemReplyComponent' },
  { label: NavLabelEnum.ABOUT_US },
  { label: NavLabelEnum.LOGOUT_ACCOUNT },
];

onLoad(async () => {
  const token = uni.getStorageSync('token');
  if (!token) {
    navigateToLogin();
  }
  userInfo.value = await getUserMeInfo()
});

const component = shallowRef<(typeof componentMap)[componentKey] | null>(null);
let key = ref<componentKey>();

watch(iconIndx, (val) => {
  key.value = readNavItems[val].type as componentKey;
  component.value = componentMap[key.value];
},
  { immediate: true });
</script>

<style lang="scss" scoped>
::v-deep uni-left-window {
  display: none;
  opacity: 0;
}
</style>

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
    width: 700rpx;
    margin: 20rpx auto;
    box-sizing: border-box;
  }

  .content__read-nav__user-manager {
    padding: 20rpx 10rpx;
  }

  &__read-nav__article-manager {
    padding: 20rpx 10rpx;
  }

  &__read-nav__split {
    width: 12rpx;
    height: 20px;
    background-color: $pink-400;
    border-radius: 100px;
  }

  &__read-nav__text {
    letter-spacing: 2rpx;
    height: 20px;
    font-size: 26rpx;
    margin-left: 20rpx;
  }

}

.iframe-content {
  display: none;
}

@media screen and (max-width:600px) {
  .mobile-user-info {
    display: none !important;
  }
}


@media screen and (min-width:600px) {
  .user-index {

    &__user {
      margin-left: 100px;
    }

    .content.page-container {
      .mobile-scroll {
        padding-left: 20px;
      }
    }
  }

  .user-index {
    .content.page-container {
      flex-direction: row;
    }

    &__user {
      position: sticky;
      top: 0;
      z-index: 300;
    }
  }



  .user-index__user {
    position: sticky;
    top: 0;
    width: 100px;
    display: flex;
    height: auto;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 50px;
    padding: 10px 10px;
    background-color: white;
  }

  .content__user {
    display: none;

    .user-bar-container {
      width: 600rpx;
    }

    .support-pay-container {
      display: none;
    }
  }

  .content__read-nav {
    display: none;
  }

  .read-nav-container {
    flex-direction: column;
    height: 470px !important;
    gap: 10rpx;

    ::v-deep .read-nav-container__icon {
      cursor: pointer;
      width: 100% !important;
      aspect-ratio: 1/1;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 15px !important;

      &:hover {
        background-color: $border-color;
      }
    }
  }

  .iframe-content {
    display: block;
  }

  .mobile-user-info {
    display: flex;
  }

}
</style>
