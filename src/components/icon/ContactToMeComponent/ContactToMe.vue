<template>
    <navigator class="contact-to-me" :url="`/pages/article/index?id=${source?.article?.id}`">
        <view class="contact-to-me--action">
            <view class="flex-1">
                <text class="contact-to-me__user">@{{ source?.username }}</text>
                <!-- 关注，收藏，点赞，评论，打赏 -->
                在<text class="contact-to-me--article-title">article title is here{{ source?.article?.title }}</text>
                <text class="contact-to-me__user-action">{{ source?.userAction }}了</text>
                <text class="contact-to-me__user-comment" v-if="source?.comment">“ &nbsp;{{ source?.comment
                    }}&nbsp;”</text>
            </view>

            <text class="contact-to-me__user-time">
                <text style="color:black;font-weight: bold;">互动时间&nbsp;&nbsp;&nbsp;&nbsp;</text>{{ new
                    Date(source?.created_at).toLocaleString()
                }}
            </text>
        </view>
        <view class="contact-to-me--article">
            <view class="contact-to-me--article-icon">
                <uni-icons fontFamily="CustomFont" :size="26" color="grey">{{ '\ue649'
                }}</uni-icons>
            </view>
        </view>
    </navigator>
</template>

<script setup lang="ts">
import type { ContactToMeData } from './type';
defineProps<{ source: ContactToMeData }>()
</script>

<style lang="scss" scoped>
.contact-to-me {
    padding: 20rpx;
    border-bottom: 1rpx dashed $border-color;
    font-size: 28rpx;

    ::v-deep .navigator-wrap {
        display: flex;
    }

    &--action {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    &__user {
        font-size: 30rpx;
        font-weight: bold;
        color: $pink-900;
    }

    &__user-time {
        display: block;
        font-size: 24rpx;
        color: $text-muted;
    }

    &__user-comment {
        font-size: 25rpx;
        text-align: start;
        font-style: italic;
        color: $text-title;
        font-weight: 400;
    }

    &--article {
        overflow: hidden;
        line-height: 1.2;
        display: flex;
        flex-direction: column;

        &-icon {
            width: 50px;
            height: 50px;
            border-radius: 18rpx;
            background-color: $border-color;
            border: 20rpx solid $border-color;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        &-title {
            font-size: 26rpx;
            overflow: hidden;
            -webkit-column-count: 1;
            text-align: start;
            margin-top: 10rpx;
            padding: 0 10rpx;
            color: $text-muted;
        }
    }


}
</style>