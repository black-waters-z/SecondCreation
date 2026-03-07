<template>
    <page-wrapper>
        <go-back class="w-full tag-page" has-shadow>
            <template #right>
                <!-- 这里加下拉组件 -->
                <Tag class="nav-tab__sticky--tag" v-if="result?.navTags?.other_tag?.name"
                    :text="result?.navTags?.other_tag?.name" :closable="false" size="medium" :bg-color="'pink'">
                </Tag>
                <view class="tag-page__work_tags" v-if="result?.navTags?.work_tags.length">
                    <uni-data-select v-model="workIndex" :localdata="work_tags" :clear="false" @change="changeWorkTag"
                        mode="none"></uni-data-select>
                </view>
                <!-- <Tag class="nav-tab__sticky--tag" v-for="(item, idx) in result?.navTags?.work_tags" :key="idx"
                    @click="changeWorkTag" :text="item.name" :closable="false" size="medium" :bg-color="'gray'">
                </Tag> -->

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
import { computed, ref } from 'vue';
const list = [{ name: '最新', peroid: 'newest' }, { name: '推荐', peroid: 'recommend' }, { name: '本周', peroid: 'week' }, { name: '本月', peroid: 'month' }, { name: '本年', peroid: 'year' },]
const gridArticle = ref<InstanceType<typeof GridArticlesContainer> | null>(null);
const { result, toggleArticle,
    startFilterArticles, changeTagArticle } = useFilterArticles(list, gridArticle);

const workIndex = ref(0);

const work_tags = computed(() => {
    if (!result.value?.navTags?.work_tags?.length) return [];
    return result.value?.navTags?.work_tags.map((item, idx) => {
        return { value: idx, text: item.name }
    })
});
function changeWorkTag() {
    if (!result.value?.navTags?.work_tags?.length) return;
    changeTagArticle(result.value?.navTags?.work_tags?.[workIndex.value]?.id);
}

</script>

<style lang="scss">
page {
    height: 100%;
}

.tag-page {
    position: relative;

    &__work_tags {
        width: 300rpx;
        position: fixed;
        z-index: 2000;
        top: 10rpx;
        right: 10rpx;
        font-size: 26rpx;

        ::v-deep .uni-stat-box {
            background-color: rgba($color: $pink-50, $alpha: 0.5);
            border-radius: 100px;
            padding-left: 10px;
        }

        ::v-deep .uni-select__input-text {
            color: pink;
        }

        ::v-deep .uni-icons {
            color: pink !important;
        }
    }
}

.nav-tab__sticky--tag {
    margin-right: 8rpx;
}
</style>
