<template>
    <view class="article-manage">
        <view class="article-manage__title">
            <text class="article-manage__title-text">文章标题</text>
            <view class="article-manage__title-bt">
                <uni-icons type="compose" size="20"></uni-icons>
                <text>编辑</text>
            </view>
        </view>
        <view class="article-manage__info">
            <view class="article-manage__info--likes">
                <text>点赞数</text>
                <text>0</text>
            </view>
            <view class="article-manage__info--favorites">
                <text>收藏数</text>
                <text>0</text>
            </view>
            <view class="article-manage__info--comments">
                <text>评论数</text>
                <text>0</text>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import SCButton from "@/components/common/SCButton/index.vue"
</script>

<style lang="scss" scoped>
.article-manage {
    box-sizing: border-box;
    padding: 20rpx;
    border-bottom: 1px dashed $border-color;
    margin-bottom: 20rpx;

    &__title {
        display: flex;
        justify-content: space-between;
        padding-left: 20rpx;

        &-text {
            flex: 1;
            letter-spacing: 2rpx;
            font-size: 30rpx;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            word-wrap: break-word;
            padding-right: 20rpx;
        }

        &-bt {
            font-size: 25rpx;
            letter-spacing: 2rpx;
            color: $text-main;
        }
    }

    &__info {
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 40rpx;
        padding-bottom: 0;

        &--likes,
        &--favorites,
        &--comments {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 22rpx;
            color: $text-muted;
        }
    }
}
</style>