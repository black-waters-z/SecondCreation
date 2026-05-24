<template>
    <view class="tag-nav-one">
        <navigator :url="`/pages/tagPage/index?tag=${tag.id}`" class="tag-navigator" hover-class="none">
            <view class="tag-content" :style="{ backgroundColor: bgColor }">
                {{ tag.name }}
            </view>
        </navigator>
    </view>
</template>

<script lang="ts" setup>
import type { Tag as TagType } from '../type';

const props = defineProps<{
    tag: TagType;
}>();
</script>

<style lang="scss" scoped>
.tag-nav-one {
    display: inline-block;
}

.tag-navigator {
    display: inline-flex;
    align-items: center;
    padding: 10rpx 20rpx;
    border-radius: 100px;
    background-color: #f5f5f5;
    border: 1rpx solid #e0e0e0;

    &:active {
        opacity: 0.7;
    }
}

.tag-content {
    font-size: 24rpx;
    color: #333;
    letter-spacing: 4rpx;
}
</style>