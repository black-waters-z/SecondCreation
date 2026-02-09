<template>
    <view class="user-info-articles">
        <UserInfoArticle v-for="(item, idx) in articleList" :key="idx" :article="item" :user="userInfo">
        </UserInfoArticle>
    </view>
</template>

<script setup lang="ts">
import UserInfoArticle from '../Article/UserInfoArticle.vue';
import type { ManageArticle } from '@/components/icon/ArticleManagerComponent/type';
import type { UserInfo } from '@/pages/user/type';
defineProps<{
    articleList: ManageArticle[];
    userInfo: UserInfo;
}>();
</script>