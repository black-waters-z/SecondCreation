<template>
    <page-wrapper class="hot-collection">
        <go-back>
            <template #default>
                <text class="text-xl" style="margin-right: 40rpx;">排行榜</text>
            </template>
            <template #right>
                <simple-tab class="hot-collection__tab-container" :tabs="tabs" @change-tab="changeTab"></simple-tab>
            </template>
        </go-back>

        <template #scroll>
            <collection :collection="item" v-for="(item, index) in collectionList" :key="index" :price="prices?.[index]"
                :number="index">
            </collection>
        </template>
    </page-wrapper>
</template>

<script setup lang="ts">
import PageWrapper from '@/components/container/PageContainer.vue';
import GoBack from '@/components/common/GoBack.vue';
import SimpleTab from '@/components/base/ChooseTab/SimpleTab.vue';
import collection from '@/components/common/UserInfoCollections/collection.vue';
import { getHotCollection } from '@/api/collectionApi';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { type CollectionData } from '@/components/common/UserInfoCollections/type';
const tabs = [
    { name: '总榜' },
    { name: '年榜' },
    { name: '月榜' },
    { name: '周榜' },
];
const collectionKey = ['all', 'year', 'month', 'week']
const prices = ['one', 'two', 'three']
const collectionList = ref<CollectionData[]>([]);

const collectionData = ref<Record<'all' | 'year' | 'month' | 'week', CollectionData[]>>({
    all: [],
    year: [],
    month: [],
    week: [],
});
onLoad(async () => {
    const { all, week, month, year } = await getHotCollection(1, 10);
    collectionData.value.all = all;
    collectionData.value.week = week;
    collectionData.value.month = month;
    collectionData.value.year = year;
    collectionList.value = all;
});
function changeTab(index: number) {
    const key = collectionKey[index] as 'all' | 'year' | 'month' | 'week'; // 获取当前 tab 对应的 key
    collectionList.value = collectionData.value[key];
}


</script>

<style lang="scss" scoped>
.hot-collection {
    &__tab-container {
        width: 700rpx;
    }
}

page {
    height: 100%;
}

@media screen and (min-width:600px) {
    .hot-collection__tab-container {
        background: none;
    }
}
</style>