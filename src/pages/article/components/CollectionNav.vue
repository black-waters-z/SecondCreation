<template>
    <view class="collection-nav" v-if="source">
        <view class="collection-nav--left flex-1 flex">
            <navigator v-if="source?.previous?.id" open-type="navigate"
                :url="`/pages/article/index?id=${source?.previous?.id}`" class="collection-nav__previous"><uni-icons
                    type="left" size="13"></uni-icons>
                {{ source?.previous?.title }}</navigator>
            <view class="collection-nav__previous collection-nav__none" v-else>暂无最早</view>
            <navigator class="collection-nav__collection">{{ source?.name }}</navigator>
            <navigator v-if="source?.next?.id" class="collection-nav__next"
                :url="`/pages/article/index?id=${source?.next?.id}`">{{
                    source?.next?.title }}&nbsp;<uni-icons type="right" size="13"></uni-icons></navigator>
            <view class="collection-nav__next collection-nav__none" v-else>暂无最新</view>
        </view>
        &nbsp;&nbsp;<ClickIcon class="order-collection" icon-type="uview">
            <template #icon1> <u-icon name="bookmark" color="#2979ff" size="19"></u-icon>
            </template>
            <template #icon2> <u-icon name="bookmark-fill" color="#2979ff" size="19"></u-icon>
            </template>
            <text>订阅合集</text>
        </ClickIcon>
    </view>
</template>

<script setup lang="ts">
import type { ArticleCollectionInfo } from '../type'
import ClickIcon from "@/components/base/ClickIcon/index.vue"
defineProps<{ source?: ArticleCollectionInfo }>()
</script>

<style lang="scss" scoped>
.collection-nav {
    padding: 20rpx;
    display: flex;
    align-items: center;
    font-size: 26rpx;
    box-sizing: border-box;
    margin-bottom: 20rpx;
    border-radius: 16rpx;
    background-color: whitesmoke;

    &--left {
        justify-content: space-between;
    }

    &__previous,
    &__next {
        color: $text-muted;
    }

    .collection-nav__none {
        color: $text-muted;
        opacity: 0.6;
    }
}
</style>