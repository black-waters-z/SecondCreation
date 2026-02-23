<template>
    <page-wrapper class="collection-articles" have_no_more>
        <go-back>合集</go-back>
        <template #scroll>
            <UserInfoArticles :article-list="source?.items" :user-info="source?.user"></UserInfoArticles>
        </template>
    </page-wrapper>
</template>

<script setup lang="ts">
import PageWrapper from '@/components/container/PageContainer.vue';
import GoBack from '@/components/common/GoBack.vue';
import UserInfoArticles from "@/components/common/UserInfoArticles/index.vue"
import { getCollectionArticles, type CollectionArticleWithUserOut } from "@/api/collectionApi";
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';

const source = ref<CollectionArticleWithUserOut>();

onLoad(async (options) => {
    const collection_id = options?.collection_id;
    const result = await getCollectionArticles(collection_id);
    source.value = result;
})
</script>

<style lang="scss">
page {
    height: 100%;
}
</style>