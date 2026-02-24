<template>
    <view class="flex store-tab">
        <up-tabs :list="list" @change="changeTab">
        </up-tabs>
        <view class="store-tab__filter">
            <uni-icons fontFamily="CustomFont" type="contact" size="22" @click="isActive = true"
                style="cursor: pointer;">{{ '\ue74a'
                }}</uni-icons>
        </view>
        <picker-wrapper v-model="isActive">
            <slot :startFilter="startFilter"></slot>
        </picker-wrapper>
    </view>
</template>

<script setup lang="ts">
import { type queryArticleKey } from '@/api/tagApi';
import PickerWrapper from '@/components/base/PickerWrapper/index.vue';
import { TimeFilter } from '@/types';
import { ref } from 'vue';

const emit = defineEmits<{
    (e: 'fetchData', timefilter: TimeFilter): Promise<void>,
    (e: 'filterArticles', query: queryArticleKey): Promise<void>,
}>()
const list = [{ id: 1, name: '年度最热', value: TimeFilter.Year }, { id: 2, name: '月度最热', value: TimeFilter.Month }, { id: 3, name: '周度最热', value: TimeFilter.Week }, { id: 4, name: '最新', value: TimeFilter.Newest }]
const isActive = ref(false)

function startFilter(value: queryArticleKey) {
    emit('filterArticles', value)
    isActive.value = false
}

function changeTab({ value }: { value: TimeFilter }) {
    const singleValue = Array.isArray(value) ? value[0] : value;
    emit('fetchData', singleValue)
}
</script>

<style lang="scss" scoped>
.store-tab {
    &__filter {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    ::v-deep .u-tabs__wrapper__nav__line {
        background-color: $pink-400;
    }
}
</style>
