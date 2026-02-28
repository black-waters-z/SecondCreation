<template>
    <navigator class="user-info-article" :url="`/pages/article/index?id=${article?.id}`">
        <view class="user-info-article__user">
            <image class="user-info-article__user__avatar" :src="user?.avatar_url" mode="aspectFill">
            </image>
            <view class="user-info-article__user__name">{{ user?.username || 11 }}</view>
            <view class="user-info-article__user__post-time">{{ article?.created_at || '1990.0.1' }}</view>
        </view>
        <view class="user-info-article__article">
            <view class="user-info-article__article__title">{{ article?.title || 'title' }}</view>
            <view class="user-info-article__article__content">{{ article?.content || 'no find content, error!' }}</view>
        </view>
        <view class="user-info-article__data">
            <view class="user-info-article__data__like">点赞数：{{ article?.like_count || 0 }}</view>
            <view class="user-info-article__data__favorite">收藏数：{{ article?.favorite_count || 0 }}</view>
            <view class="user-info-article__data__comment">评论数：{{ article?.comment_count || 0 }}</view>
        </view>
    </navigator>
</template>

<script setup lang="ts">
import type { ManageArticle } from '@/components/icon/ArticleManagerComponent/type';
import type { UserInfo } from '@/pages/user/type';
defineProps<{
    user: UserInfo;
    article: ManageArticle;
}>();
</script>

<style lang="scss" scoped>
.user-info-article {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 20rpx;
    border-bottom: 1rpx dashed $border-color;

    &__user {
        display: flex;
        gap: 10rpx;
        align-items: center;

        &__avatar {
            width: 50rpx;
            height: 50rpx;
            border-radius: 50%;
            background-color: $pink-color;
        }

        &__post-time {
            margin-left: auto;
            letter-spacing: 1rpx;
            font-size: 20rpx;
            color: $text-muted;
        }

        &__name {
            font-size: 28rpx;
            color: $text-main;
        }
    }

    &__article {
        padding: 10rpx 20rpx;
        box-sizing: border-box;

        &__title {
            font-size: 30rpx;
            color: $text-main;
        }

        &__content {
            font-size: 24rpx;
            color: $text-muted;
        }
    }

    &__data {
        display: flex;
        gap: 10rpx;
        align-items: center;
        justify-content: space-between;
        margin-top: 20rpx;
        box-sizing: border-box;
        padding: 0rpx 20rpx;

        &__like,
        &__favorite,
        &__comment {
            font-size: 20rpx;
            color: $text-muted;
        }
    }
}

@media screen and (min-width:600px) {
    .user-info-article {
        background-color: white;
        box-shadow: $grey-shadow-01;
        border-radius: 20px;
    }

}
</style>