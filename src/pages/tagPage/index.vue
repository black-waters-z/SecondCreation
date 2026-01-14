<template>
    <page-wrapper show-head>
        <go-back class="w-full"></go-back>
        <nav-tab :list="list" :nav-tags="result?.navTags"></nav-tab>
        <template #scroll>
            <water-fall v-if="result?.articleList?.length" :water-fall-col-num="2"
                :article-lists="result?.articleList"></water-fall>
        </template>
    </page-wrapper>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PageWrapper from '@/components/container/PageContainer.vue';
import { onLoad, onReady } from '@dcloudio/uni-app';
import { getTagPageData } from '@/api/tagApi';
import type { TagPageData } from '@/pages/tagPage/type';
import WaterFall from '@/components/common/WaterFall.vue';
import NavTab from '@/components/base/NavTab/index.vue';
import GoBack from '@/components/common/GoBack.vue';
onLoad(async (options) => {
    tagParam = options?.tag;
    if (tagParam) {
        result.value = await getTagPageData(tagParam) as TagPageData;
    }
})
const list = [{ name: '最新' }, { name: '推荐' }, { name: '本月' }, { name: '本周' }]
let tagParam: string | undefined;
const result = ref<TagPageData>();


</script>

<style lang="scss" scoped>
page {
    height: 100vh;
}
</style>
