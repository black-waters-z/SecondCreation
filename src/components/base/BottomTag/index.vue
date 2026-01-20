<template>
    <view class="bottom-tag">
        <scroll-view scroll-x enable-flex class="bottom-tag__scroll">
            <view class="bottom-tag__item">
                <Tag v-for="item in tagList" class="bottom-tag__item-tag" :bg-color="'pink'" :text="item.name"
                    :key="item.id" :closable="false" size="mini"></Tag>
            </view>
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
    },
});
</script>

<style lang="scss" scoped>
.bottom-tag {
    min-width: 0;
}

.bottom-tag__item {
    align-items: center;
    white-space: nowrap;
    padding-right: 12rpx;

    &-tag {
        margin-right: 10rpx;
        transform: scale(0.8);
    }
}

.bottom-tag__scroll {
    min-width: 0;
    width: 100%;
    white-space: nowrap;
}

.bottom-tag__item {
    align-items: center;
    white-space: nowrap;
}

// #ifdef MP-WEIXIN
.bottom-tag__item {
    display: flex;
}

// #endif</style>
