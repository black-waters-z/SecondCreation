<template>
    <view class="bottom-tag">
        <scroll-view scroll-x enable-flex class="bottom-tag__scroll">
            <Tag v-for="item in tagList" class="bottom-tag__item-tag" :bg-color="'#b8b8b8'" :text="item.name"
                :key="item.id" :closable="false" size="mini"></Tag>
        </scroll-view>
    </view>
</template>

<script setup lang="ts">
import Tag from '@/components/common/Tag/index.vue'
import type { Tag as TagType } from '@/pages/tagNav/type'
defineProps<{
    tagList?: TagType[];
}>()

defineOptions({
    options: {
        styleIsolation: 'shared',
        virtualHost: true,
    },
});
</script>

<style lang="scss" scoped>
.bottom-tag__scroll {
    min-width: 0;
    display: flex;
    width: 100%;

    ::v-deep .uni-scroll-view-content {
        gap: 10rpx;
        min-width: 100%;
        width: max-content;
        display: flex;
        justify-content: flex-start;
        overflow: hidden;
        flex-wrap: nowrap;
    }
}

// #ifdef MP-WEIXIN
.bottom-tag__item {
    display: flex;
}

// #endif</style>
