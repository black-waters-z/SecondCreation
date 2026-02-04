<template>
    <view class="article-manager-component">
        <article-manage v-for="(item, idx) in articleList" :article="item" :key="idx"></article-manage>
    </view>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import ArticleManage from './ArticleManage.vue';
import { getManageArticleList } from '@/api/articleApi';
import type { ManageArticle } from './type';
const articleList = ref<ManageArticle[]>([]);
onMounted(async () => {
    articleList.value = await getManageArticleList(1, 10);

})
</script>

<style lang="scss" scoped></style>