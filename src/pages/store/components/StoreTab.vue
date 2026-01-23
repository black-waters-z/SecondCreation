<template>
    <view class="flex store-tab">
        <up-tabs :list="list">
        </up-tabs>
        <view class="store-tab__filter">
            <uni-icons fontFamily="CustomFont" type="contact" size="22" @click="isActive = true">{{ '\ue74a'
                }}</uni-icons>
        </view>
        <picker-wrapper v-model="isActive"></picker-wrapper>
    </view>
</template>

<script setup lang="ts">
import PickerWrapper from '@/components/base/PickerWrapper/index.vue';
import { ref } from 'vue';
const list = [{ id: 1, name: '年度最热' }, { id: 2, name: '月度最热' }, { id: 3, name: '周度最热' }, { id: 4, name: '最新' }]
const isActive = ref(false)

interface collection {
    id: number;
    name: string;
}
const selectIndex = ref(0)
const collectionList = ref<collection[]>([{ id: 1, name: '文' }, { id: 2, name: '画' }, { id: 3, name: '视频' }, { id: 4, name: '糖' }])
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