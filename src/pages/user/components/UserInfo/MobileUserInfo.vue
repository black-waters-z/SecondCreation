<template>
    <view class="user-info" v-if="isMobile">
        <view class="user-info__other">
            <view class="user-info__other__tag">总点击数 {{ userInfo?.clickedPoints || 0 }} </view>
            <view class="user-info__other__tag">总被收藏数 {{ userInfo?.favoritedPoints || 0 }} </view>
            <view class="user-info__other__tag">总粉丝 {{ userInfo?.fans || 0 }} </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import type { UserInfo } from '../../type';
import { isMobile } from '@/utils/index';

defineProps<{
    userInfo: UserInfo;
}>();
</script>

<style lang="scss" scoped>
.user-bar-container {
    width: 100%;
    // #ifdef MP-WEIXIN
    width: 100vw;
    // #endif
    background-color: white;
    border-radius: 16rpx;
    display: flex;
    flex-direction: row;
    padding-bottom: 20rpx;

    &__avatar {
        width: 130rpx;
        height: 130rpx;
        background-color: antiquewhite;
        border-radius: 1000rpx;
        margin: 20rpx 0 0 20rpx;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .no-login-grey {
        background-color: grey;
        opacity: 0.5;
        cursor: pointer;
    }

    .user-info {
        margin: 20rpx 0 0 20rpx;
        flex: 1;

        &__name {
            font-weight: 700;
            font-size: 40rpx;
            display: flex;
            align-items: first baseline;
            position: relative;

            &__icon {
                margin-right: 40rpx;
                top: 10rpx;
            }
        }

        &__other {
            display: flex;
            font-size: 18rpx;
            margin-top: 20rpx;

            &__tag {
                background-color: rgb(239, 236, 236);
                padding: 5rpx 10rpx;
                border-radius: 1000px;
                margin-left: 10rpx;
            }
        }
    }
}
</style>