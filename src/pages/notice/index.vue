<template>
    <PageWrapper class="notice-page">
        <go-back>官方公告</go-back>
        <template #scroll>
            <UserInfoArticle :article="item" v-for="item in articleList" :key="item.id" :user="userInfo">
            </UserInfoArticle>
        </template>
    </PageWrapper>
</template>

<script setup lang="ts">
import PageWrapper from '@/components/container/PageContainer.vue';
import UserInfoArticle from '@/components/common/Article/UserInfoArticle.vue';
import GoBack from '@/components/common/GoBack.vue';
import { getMineArticleList } from '@/api/articleApi';
import { getUserMeInfo } from '@/api/userApi';
import { type UserInfo } from '@/pages/user/type';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { type ManageArticle } from '@/components/icon/ArticleManagerComponent/type';

const articleList = ref<ManageArticle[]>([]);
const userInfo = ref<UserInfo>();
onLoad(async () => {
    getMineArticleList(1, 10, 5).then((res) => {
        articleList.value = res;
    });
    getUserMeInfo(5).then((res) => {
        userInfo.value = res;
    });
});
</script>

<style lang="scss"></style>