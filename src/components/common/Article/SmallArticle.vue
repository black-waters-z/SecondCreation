<template>
    <view class="small-article">
        <image class="article-img" :src="article.image_urls?.[0]" v-if="article.image_urls?.[0]" mode="aspectFill">
        </image>
        <view class="article-content" v-if="!article.image_urls?.[0]">{{ article?.content.slice(0, 50) }}</view>
        <navigator open-type="navigate" :url="`/pages/article/index?id=${article.id}`" class="article-title">{{
            article?.title }}</navigator>
    </view>
</template>

<script setup lang="ts">
import type { Article } from "@/pages/tagPage/type";
defineProps<{
    article: Article;
}>();
</script>

<style lang="scss" scoped>
.small-article {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-self: center;

    .article-img {
        width: 180rpx;
        height: 180rpx;
        border-radius: 10upx;
        background-color: $uni-bg-color-grey;
    }

    .article-content {
        width: 180rpx;
        height: 180rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 20rpx;
        background-color: $uni-bg-color-grey;
        border-radius: 15rpx;
        box-sizing: border-box;
        color: $text-muted;
        padding: 22rpx 10rpx;
    }

    .article-title {
        font-size: 20rpx;
        letter-spacing: 1rpx;
        margin-top: 10rpx;
        text-align: center;
        overflow: hidden;
        white-space: nowrap;
    }
}

@media (min-width: 600px) {
    .small-article {
        .article-img {
            width: 320rpx;
            height: 320rpx;
        }

        .article-content {
            width: 320rpx;
            height: 320rpx;
        }
    }
}
</style>