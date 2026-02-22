<template>
    <view class="draft">
        <view class="flex-1 draft-head">
            <view class="draft-title">{{ draft.title }}</view>
            <view class="draft-delete">
                <uni-icons type="trash-filled" size="22"></uni-icons>

            </view>
        </view>
        <view class="draft-build-time">{{ new Date(draft.created_at).toLocaleDateString() }}</view>
    </view>
</template>

<script setup lang="ts">
import type { DraftListItem } from "./type";

defineProps<{
    draft: DraftListItem;
}>();
</script>

<style lang="scss" scoped>
.draft {
    width: 100%;
    height: 80px;
    box-sizing: border-box;
    margin: 10rpx;
    padding: 20rpx;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    border-bottom: 1px dashed $border-color;

    .draft-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &-delete {
        margin-right: 20rpx;
    }

    .draft-build-time {
        font-size: 22rpx;
        color: $text-muted;
    }
}
</style>