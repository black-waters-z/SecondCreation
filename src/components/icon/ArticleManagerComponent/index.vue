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

defineOptions({
  options: {
    virtualHost: true,
  },
});
</script>

<style lang="scss" scoped>
@media screen and (min-width:600px) {
    .article-manager-component {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 20px;
    }

}
</style>