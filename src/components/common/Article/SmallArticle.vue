<template>
    <navigator open-type="navigate" :url="`/pages/article/index?id=${article.id}`" class="small-article">
        <image class="article-img" :src="article.image_urls?.[0]" v-if="article.image_urls?.[0]" mode="aspectFill">
        </image>
        <text class="article-img-title" v-if="article.image_urls?.[0]">{{ article.title }}</text>
        <view class="article-content" v-if="!article.image_urls?.[0]">
            <view class="article-content__container">
                <text class="article-title">{{ article.title }}</text>
                <text>{{ article?.content.slice(0, 200) }}</text>
            </view>
        </view>
    </navigator>
</template>

<script setup lang="ts">
import type { Article } from "@/pages/tagPage/type";
defineProps<{
    article: Article;
}>();

defineOptions({
  options: {
    virtualHost: true,
  },
});
</script>

<style lang="scss" scoped>
.small-article {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 20rpx;
    position: relative;
    height: 180rpx;

    .article-img {
        width: 180rpx;
        height: 180rpx;
        border-radius: 10rpx;
        background-color: $uni-bg-color-grey;

        &-title {
            width: 100%;
            position: absolute;
            left: 0;
            bottom: 0;
            font-size: 24rpx;
            height: 90rpx;
            background: linear-gradient(to top, rgba(0, 0, 0, 0.523), rgba(8, 8, 8, 0.195), rgba(255, 255, 255, 0));
            letter-spacing: 2rpx;
            display: flex;
            align-items: flex-end;
            box-sizing: border-box;
            padding: 10rpx 10rpx;
            color: white;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
            border-radius: 0 0 10rpx 10rpx;
        }
    }

    .article-content {
        width: 180rpx;
        height: 180rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 20rpx;
        background-color: $uni-bg-color-grey;
        border-radius: 20rpx;
        box-sizing: border-box;
        color: $text-muted;
        padding: 20rpx;
        line-height: 1.7;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 7;
        word-wrap: break-word;
        word-break: break-all;
        -webkit-box-orient: vertical;
        overflow: hidden;

        &__container {
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
    }

    .article-title {
        font-size: 20rpx;
        overflow: hidden;
        white-space: nowrap;
        font-weight: 400;
        color: $text-title;
    }
}

@media (min-width: 600px) {
    .small-article {
        display: flex;
        width: 150px;
        min-height: 150px;

        .article-img {
            width: 100%;
            min-height: 150px;
            border-radius: 15px;
            box-shadow: $grey-shadow-02;

            &-title {
                height: 90rpx;
                border-radius: 0 0 15px 15px;
            }
        }

        .article-content {
            width: 150px;
            height: 150px;
            border-radius: 15px;
            box-shadow: $grey-shadow-02;
            background-color: white;
        }

        .article-title {
            font-size: 13px;
            font-weight: 500;
            color: $text-main;
            display: block;
        }

        &:hover {
            &::after {
                content: '点击查看文章';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                border-radius: 15px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: white;
                font-size: 24rpx;
                text-shadow: $grey-shadow-01;
                text-decoration: underline;
            }
        }
    }
}
</style>