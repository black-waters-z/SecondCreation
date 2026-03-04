<template>
    <page-wrapper>
        <go-back class="w-full" has-shadow>
            <template #right>
                <Tag class="nav-tab__sticky--tag" @click="changeWorkTag" v-if="result?.navTags?.work_tags?.length"
                    :text="result?.navTags?.work_tags?.[workIndex]?.name" :closable="false" size="medium"
                    :bg-color="'gray'">
                </Tag>
                <Tag class="nav-tab__sticky--tag" v-if="result?.navTags?.other_tag?.name"
                    :text="result?.navTags?.other_tag?.name" :closable="false" size="medium" :bg-color="'pink'">
                </Tag>
            </template>

        </go-back>
        <nav-tab v-slot="{ startFilter }" :list="list" :nav-tags="result?.navTags" @change-tab="toggleArticle"
            @start-filter-articles="startFilterArticles">
            <filter-store-article @start-filter="startFilter"></filter-store-article>
        </nav-tab>
        <template #scroll>
            <grid-articles-container ref="gridArticle" v-if="result?.articleList?.length"
                :article-list="result?.articleList"></grid-articles-container>
        </template>
    </page-wrapper>
</template>

<script setup lang="ts">
import PageWrapper from '@/components/container/PageContainer.vue';
import Tag from '@/components/common/Tag/index.vue';
import filterStoreArticle from '@/components/form/filterStoreArticle.vue';
import GridArticlesContainer from '@/components/common/GridArticlesContainer/index.vue';
import NavTab from '@/components/base/NavTab/index.vue';
import GoBack from '@/components/common/GoBack.vue';
import { useFilterArticles } from '@/hooks/useFilterArticles';
import { ref } from 'vue';
const list = [{ name: '最新', peroid: 'newest' }, { name: '推荐', peroid: 'recommend' }, { name: '本周', peroid: 'week' }, { name: '本月', peroid: 'month' }, { name: '本年', peroid: 'year' },]
const gridArticle = ref<InstanceType<typeof GridArticlesContainer> | null>(null);
const { result, toggleArticle,
    startFilterArticles, changeTagArticle } = useFilterArticles(list, gridArticle);

const workIndex = ref(0);
function changeWorkTag() {
    if (!result.value?.navTags?.work_tags?.length) return;
    workIndex.value = (workIndex.value + 1) % result.value?.navTags?.work_tags?.length;
    changeTagArticle.value(result.value?.navTags?.work_tags?.[workIndex.value]?.id);
}
</script>

<style lang="scss">
page {
    height: 100%;
}

.nav-tab__sticky--tag {
    margin-right: 8rpx;
}
</style>
