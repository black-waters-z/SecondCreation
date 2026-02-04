<template>
    <view class="article-author">
        <image class="article-author__avatar" :src="userInfo?.avatar_url" mode="aspectFill"></image>
        <text class="article-author__name">{{ userInfo?.username }}</text>
    </view>
</template>

<script setup lang="ts">
import type { UserInfo } from '@/pages/user/type';

defineProps<{ userInfo: UserInfo }>()
</script>

<style lang="scss" scoped>
.article-author {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 20rpx 0;

    .article-author__avatar {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
        background-color: #f5f5f5;
        box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.733);
    }

    .article-author__name {
        margin-left: 20rpx;
        font-size: 30rpx;
        color: #333;
        font-weight: 600;
        font-style: italic;
    }
}
</style>
