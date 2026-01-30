<template>
    <view class="w-full flex flex-column article">
        <view class="article__head">
            <image class="w-full article-img" :src="`${article?.image_urls[0]}`"
                v-if="article?.image_urls?.[0] && !isVideo" mode="aspectFill" />
            <!-- 视频之后再说，后端没发过来呢 -->
            <view class="w-full article-video-container" v-if="isVideo">
                <video class="article-video" :src="`${article.image_urls?.[0]}`"></video>
                <view class="article-video--info">
                    <text class="article-video__title">{{ article?.title }}</text>
                    <text class="article-video__author">小甜甜</text>
                </view>
                <view class="article-video__play">
                    <uni-icons class="article-video__play--icon" fontFamily="CustomFont" :size="23" color="white">{{
                        '\ue89d'
                        }}</uni-icons>
                </view>
            </view>
            <text class="w-full article-content" v-if="!article?.image_urls?.[0] && !isVideo">
                {{ article?.content }}
            </text>
        </view>
        <view class="article-info flex-1">
            <navigator v-if="!isVideo" :url="`/pages/article/index?id=${article?.id}`" open-type="navigate"
                hover-class="navigator-hover">
                <text class="article-info__title text-ellipsis">{{ article?.title }}</text>
            </navigator>
            <view v-if="!isVideo" class="article-info__scroll-view flex flex-row">
                <bottom-tag :tag-list="article?.tags" class="article-info__tag flex-1"></bottom-tag>
                <view class="article-info__author">
                    <!-- <image class="article-info__author--avatar" src="/src/static/character/character1.png"
                        mode="aspectFill"></image> -->
                    <text class="article-info__author--author-name">{{ article?.author }}小甜甜小甜甜小甜甜</text>
                </view>
            </view>
            <view class="article__click-icon__container">
                <view class="article__click-icon--left">
                    <click-icon class="article__click-icon--left-icon" :type="['eye-filled']" :size="18">{{
                        article?.view_count ?? 0 }}</click-icon>
                    <click-icon class="article__click-icon--left-icon" :type="['hand-up']" :size="18">{{
                        article?.like_count ?? 0 }}</click-icon>
                </view>
                <click-icon class="article__click-icon" :type="['heart', 'heart-filled']" :size="16"
                    :has-been-liked="article?.has_favorited"></click-icon>
            </view>
        </view>

    </view>
</template>

<script setup lang="ts">
import BottomTag from '@/components/base/BottomTag/index.vue';
import type { ArticleType } from './type';
import { computed } from 'vue';
import ClickIcon from "@/components/base/ClickIcon/index.vue"
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
    width: 350rpx;
    background: white;
    margin: 20rpx 5rpx;
    box-sizing: border-box;
    border-radius: 16rpx;
    // border: 1px solid #fdcdd8;
    padding: 0 0 5rpx 0;

    &__click-icon {
        position: relative;
        z-index: 200;

        &--left {
            display: flex;
            flex: 1;
            align-items: center;

            &-icon {
                margin-right: 20rpx;
            }
        }
    }

    &__click-icon__container {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        z-index: 100;
    }

    &-video-container {
        height: 100px;
    }

    &__head {
        display: block;
        height: fit-content;
        box-sizing: border-box;
        position: relative;
    }

    &-video {
        width: 100%;
        height: 100px;
        border-radius: 15rpx;
        display: block;
        vertical-align: top;

        &--info {
            z-index: 100;
            max-height: 100rpx;
            position: absolute;
            display: flex;
            bottom: 0;
            opacity: 0.8;
            width: 100%;
            box-sizing: border-box;
            padding-bottom: 10rpx;
        }

        &__title {
            letter-spacing: 2rpx;
            flex: 1;
            color: white;
            padding: 5rpx 20rpx;
            font-size: 10px;
            overflow: hidden;
            white-space: nowrap;
        }

        &__author {
            width: 100rpx;
            color: white;
            padding: 5rpx 20rpx;
            font-size: 10px;
            overflow: hidden;
            white-space: nowrap;
            display: flex;
            box-sizing: border-box;
            justify-content: flex-end;
            font-style: italic;
            font-weight: 300;
            text-decoration: underline;
        }

        &__play {
            position: absolute;
            z-index: 100;
            right: 15rpx;
            top: 15rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50rpx;
            height: 50rpx;
            border-radius: 50%;
        }
    }

    &-img {
        position: relative;
        max-height: 400rpx;
        background-color: #fdcdd8;
        border-radius: 16rpx;
        display: block;
        vertical-align: top;

        &::after {
            content: "";
            display: block;
            width: 100%;
            height: 200rpx;
            z-index: 100;
            position: relative;
            transform: translateY(-100%);
        }
    }

    &-content {
        display: block;
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
        padding-bottom: 0;
        background: #f1f1f19f;
        border-radius: 15rpx;
    }

    .text-ellipsis {
        margin-top: 10rpx;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        /* 显示两行 */
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 1.3em;
        max-height: 3em;
        word-wrap: break-word;
        word-break: break-all;
    }

    &-info {
        box-sizing: border-box;
        padding: 0 10rpx;

        &__tag {
            min-width: 0;
        }

        &__scroll-view {
            width: 100%;
            margin-top: 6rpx;
        }

        &__title {
            font-size: 28rpx;
            font-weight: 500;
            letter-spacing: 1rpx;
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
        width: 460rpx;

        .article-video-container {
            height: 140px;
        }

        &-video {
            height: 140px;
        }


        &-img {
            min-height: 600rpx;
        }

        &-content {
            max-height: 600rpx;
        }
    }
}
</style>
