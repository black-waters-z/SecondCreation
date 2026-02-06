<template>
    <page-wrapper>
        <GoBackIcon style="position: fixed;z-index: 1000;left: 20rpx;top: 20rpx;"></GoBackIcon>
        <user-info></user-info>
        <user-info-tab class="w-full" v-model:current="current"></user-info-tab>
        <template #scroll>
            <!-- 这里放tab -->
            <!-- 放分别内容、合集 -->
            <swiper-wrapper v-model:current="current">
                <template #a>
                    <favorite-component></favorite-component>
                </template>
                <template #b>
                    b
                </template>
                <template #c>
                    c
                </template>
            </swiper-wrapper>
            <collection-list></collection-list>
            <article-list></article-list>
        </template>
    </page-wrapper>
</template>

<script setup lang="ts">
import PageWrapper from '@/components/container/PageContainer.vue';
import UserInfo from "@/components/common/UserInfo/index.vue"
import UserInfoTab from "@/components/common/UserInfoTab/index.vue"
import FavoriteComponent from "@/components/icon/FavoriteComponent/index.vue"
import SwiperWrapper from "@/components/base/SwiperWrapper/index.vue"
import GoBackIcon from "@/components/base/GoBackIcon/index.vue"
import { ref } from 'vue';

const current = ref(0)

</script>

<style lang="scss"></style>