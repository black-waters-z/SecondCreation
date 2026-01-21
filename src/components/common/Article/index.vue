<template>
    <view class="w-full flex flex-column article">
        <image class="w-full article-img" :src="`${getImageBaseUrl}${article?.image_urls[0]}`"
            v-if="article?.image_urls?.[0] && !isVideo" mode="aspectFill" />
        <!-- 视频之后再说，后端没发过来呢 -->
        <view class="w-full article-video-container">
            <video class="article-video" :src="`${getVideoBaseUrl}${article.image_urls?.[0]}`" v-if="isVideo"></video>
        </view>

        <text class="w-full article-content" v-if="!article?.image_urls?.[0] && !isVideo">
            {{ article?.content }}
        </text>
        <view class="article-info flex-1">
            <navigator :url="`/pages/article/index?id=${article?.id}`" open-type="navigate"
                hover-class="navigator-hover">
                <text class="article-info__title text-ellipsis">{{ article?.title }}想要成为你的恋人，为什么不可以呢（1）</text>
            </navigator>
            <view class="article-info__scroll-view flex flex-row">
                <bottom-tag :tag-list="article?.tags" class="article-info__tag flex-1"></bottom-tag>
                <view class="article-info__author">
                    <!-- <image class="article-info__author--avatar" src="/src/static/character/character1.png"
                        mode="aspectFill"></image> -->
                    <text class="article-info__author--author-name">{{ article?.author }}小甜甜小甜甜小甜甜</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import BottomTag from '@/components/base/BottomTag/index.vue';
import type { ArticleType } from './type';
import { computed } from 'vue';
const props = defineProps<{ article: ArticleType }>();

const getImageBaseUrl = computed(() => {
    return import.meta.env.VITE_IMAGE_BASE || 'http://localhost:8080/static/upload_IMG/';
})

const getVideoBaseUrl = computed(() => {
    return import.meta.env.VITE_VIDEO_BASE || 'http://localhost:8080/static/upload_Video/';
})

const isVideo = computed(() => {
    const fileExtension = props.article?.image_urls?.[0]?.split('.').pop().toLowerCase();
    const videoExtensions = ['mp4', 'avi', 'mkv', 'webm', 'mov', 'flv', 'wmv'];
    if (videoExtensions.includes(fileExtension)) return true;
    return false;
});

</script>

<style lang="scss" scoped>
.article {
    width: 340rpx;
    background: white;
    margin: 20rpx 5rpx;
    box-sizing: border-box;
    border-radius: 16rpx;

    &-video {
        width: 100%;
        height: 120px;
    }

    &-img {
        position: relative;
        min-height: 400rpx;
        background-color: #fdcdd8;
        border-radius: 16rpx;

        &::after {
            content: "";
            display: block;
            width: 100%;
            height: 200rpx;
            z-index: 100;
            position: relative;
            background: linear-gradient(to top, rgb(255, 255, 255) 0%, transparent);
            transform: translateY(-100%);
        }
    }

    &-content {
        min-height: 300rpx;
        max-height: 400rpx;
        box-sizing: border-box;
        padding: 20rpx;
        font-size: 25rpx;
        font-style: italic;
        font-weight: 400;
        color: $text-muted;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .text-ellipsis {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        /* 显示两行 */
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 1.5em;
        max-height: 3em;
        word-wrap: break-word;
        word-break: break-all;
    }

    &-info {
        box-sizing: border-box;
        padding: 0 20rpx;

        &__tag {
            min-width: 0;
        }

        &__scroll-view {
            width: 100%;
            margin-top: 6rpx;
        }

        &__title {
            font-size: 32rpx;
            font-weight: 600;
            letter-spacing: 2rpx;
            white-space: 2lines;
        }

        &__author {
            display: flex;
            align-items: center;

            &--avatar {
                width: 40rpx;
                height: 40rpx;
                border-radius: 50%;
            }

            &--author-name {
                max-width: 160rpx;
                font-size: 24rpx;
                font-weight: 400;
                margin-left: 10rpx;
                color: $text-muted;
                letter-spacing: 1rpx;
                font-style: italic;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                text-overflow: ellipsis;
                word-wrap: break-word;
                word-break: break-all;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
        }
    }
}

::v-deep .uni-video-cover-play-button {
    &::after {
        font-size: 30px;
        display: none;
    }
}

@media screen and (min-width:600px) {
    .article {
        box-sizing: border-box;
        width: 100%;

        &-img {
            min-height: 600rpx;
        }

        &-content {
            max-height: 600rpx;
        }
    }
}
</style>