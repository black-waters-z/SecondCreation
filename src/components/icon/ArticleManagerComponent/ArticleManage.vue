<template>
    <view class="article-manage">
        <view class="article-manage__title">
            <text class="article-manage__title-text">{{ article?.title }}</text>
            <navigator :url="`/pages/post/index?article_id=${article?.id}`" open-type="navigate"
                class="article-manage__title-bt">
                <uni-icons type="compose" size="20"></uni-icons>
                <text>编辑</text>
            </navigator>
        </view>
        <view class="article-manage__info">
            <view class="article-manage__info--likes">
                <text>点赞数</text>
                <text>{{ article?.like_count ?? 0 }}</text>
            </view>
            <view class="article-manage__info--favorites">
                <text>收藏数</text>
                <text>{{ article?.favorite_count ?? 0 }}</text>
            </view>
            <view class="article-manage__info--comments">
                <text>评论数</text>
                <text>{{ article?.comment_count ?? 0 }}</text>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import type { ManageArticle } from "./type"
defineProps<{ article: ManageArticle }>()
</script>

<style lang="scss" scoped>
.article-manage {
    box-sizing: border-box;
    padding: 20rpx;
    border-bottom: 1px dashed $border-color;
    margin-top: 20rpx;

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

@media screen and (min-width:600px) {
    .article-manage {
        background-color: white;
        box-shadow: $grey-shadow-01;
        border-radius: 20rpx;
        min-height: 130px;
        display: flex;
        flex-direction: column;

        &__info {
            flex: 1;
            display: flex;
            align-items: flex-end;
        }
    }


}
</style>