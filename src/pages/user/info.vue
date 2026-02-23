<template>
    <page-wrapper>
        <GoBackIcon style="position: fixed;z-index: 1000;left: 20rpx;top: 20rpx;"></GoBackIcon>
        <UserInfo :user-info="userInfo"></UserInfo>
        <user-info-tab class="w-full" v-model:current="current"></user-info-tab>
        <!-- 这里放tab -->
        <!-- 放分别内容、合集 -->
        <swiper-wrapper v-model:current="current">
            <template #a>
                <ScrollContainer :enable_refresher="false">
                    <favorite-component></favorite-component>
                </ScrollContainer>
            </template>
            <template #b>
                <ScrollContainer :enable_refresher="false">
                    <UserInfoArticles :article-list="articleList" :user-info="userInfo"></UserInfoArticles>
                </ScrollContainer>
            </template>
            <template #c>
                <ScrollContainer :enable_refresher="false">
                    <UserInfoCollections :collection-list="collectionList"></UserInfoCollections>
                </ScrollContainer>
            </template>
        </swiper-wrapper>
    </page-wrapper>
</template>

<script setup lang="ts">
import PageWrapper from '@/components/container/PageContainer.vue';
import UserInfo from "@/components/common/UserInfo/index.vue"
import UserInfoTab from "@/components/common/UserInfoTab/index.vue"
import ScrollContainer from '@/components/common/ScrollContainer/index.vue';
import FavoriteComponent from "@/components/icon/FavoriteComponent/index.vue"
import SwiperWrapper from "@/components/base/SwiperWrapper/index.vue"
import GoBackIcon from "@/components/base/GoBackIcon/index.vue"
import UserInfoArticles from "@/components/common/UserInfoArticles/index.vue"
import UserInfoCollections from "@/components/common/UserInfoCollections/index.vue"
import { getUserInfoCollection } from "@/api/collectionApi";
import { getMineArticleList } from "@/api/articleApi"
import { type Ref, ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import type { CollectionData } from '@/components/common/UserInfoCollections/type';
import { type ManageArticle } from '@/components/icon/ArticleManagerComponent/type';
import { getUserMeInfo, type UserInfoWithFollow } from '@/api/userApi';

const current = ref(2)
// const userInfo = ref<UserInfo>()
const collectionList = ref<CollectionData[]>([])
const articleList = ref<ManageArticle[]>([])
const userInfo = ref<UserInfoWithFollow>() as Ref<UserInfoWithFollow>
onLoad(async (options) => {
    if (!options?.id) {
        userInfo.value = await getUserMeInfo();
        collectionList.value = await getUserInfoCollection();
        articleList.value = await getMineArticleList(1, 10);
    } else {
        userInfo.value = await getUserMeInfo(options.id);
        collectionList.value = await getUserInfoCollection(options.id);
        articleList.value = await getMineArticleList(1, 10, options.id);
    }

})
</script>

<style lang="scss">
page {
    height: 100%;
}
</style>