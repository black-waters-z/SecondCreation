<template>
    <view class="user-info" v-if="!isMobile">
        <view class="w-full flex user-info__user">
            <view class="user-bar-container__avatar no-login-grey" v-if="!isMobile">
                <uni-icons fontFamily="CustomFont" color="white" size="24"> &#xe61c; </uni-icons>
            </view>
            <view class="user-info__name">
                <view>{{ userInfo?.name || '尚未登录' }}</view>
            </view>

            <view class="user-info__other">
                <view class="user-info__other__tag">总点击数 {{ userInfo?.clickedPoints || 0 }} </view>
                <view class="user-info__other__tag">总被收藏数 {{ userInfo?.favoritedPoints || 0 }} </view>
                <view class="user-info__other__tag">总粉丝 {{ userInfo?.fans || 0 }} </view>
            </view>
            <view class="user-info__nav">
                <view v-for="(value, idx) in userManage" :key="idx" class="user-info__nav__item">
                    <text>{{ value.name }}</text>
                </view>
            </view>
            <view class="user-info__time">
                <text>本账号于2026.1.15注册</text>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import type { UserInfo } from '../../type';
import { isMobile } from '@/utils/index';
defineProps<{
    userInfo: UserInfo;
}>();

const userManage = [
    { name: '用户设置', path: '/pages/user/userSetting' },
    { name: '问题反馈', path: '/pages/user/userFeedback' },
    { name: '修改密码', path: '/pages/user/changePassword' },
    { name: '退出登录', path: '/pages/user/logout' },
    { name: '关于我们', path: '/pages/user/aboutUs' },
    { name: '注销账号', path: '/pages/user/deleteAccount' },
]
</script>

<style lang="scss" scoped>
.user-bar-container {
    display: flex;
    justify-content: center;

    &__avatar {
        width: 130rpx;
        height: 130rpx;
        border-radius: 1000rpx;
        background-color: $border-color;
        margin: 0 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .user-info {
        margin: 20rpx 0 0 20rpx;
        flex: 1;
        transition: all 0.5s ease-in-out;
        opacity: 0;
        z-index: -1;
        transform: translateX(80px);

        &__time {
            font-size: 12px;
            color: $text-muted;
            margin-top: 70rpx;
        }

        &__nav {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            margin-top: 100rpx;
            column-gap: 100px;
            row-gap: 10px;

            &__item {
                padding: 10rpx 0;
                cursor: pointer;
                font-weight: 400;
                font-size: 14px;

                &:hover {
                    color: $text-muted;
                }
            }
        }

        &__user {
            flex-direction: column;
            align-items: center;
        }

        &__name {
            font-weight: 700;
            font-size: 40rpx;
            display: flex;
            align-items: first baseline;
            position: relative;
            margin-top: 6px;

            &__icon {
                margin-right: 40rpx;
                top: 10rpx;
            }
        }

        &__other {
            display: flex;
            font-size: 14px;
            margin-top: 20rpx;
            gap: 10px;
            color: $text-muted;

            &__tag {
                padding: 5rpx 10rpx;
                margin-left: 10rpx;

            }
        }
    }
}

.user-bar-container {

    &__avatar {
        margin: 0 0;
        cursor: pointer;
    }
}

.user-info {
    position: absolute;
    z-index: 300;
    top: 0px;
    left: 70px;
    box-sizing: border-box;
    padding: 20px;
    background-color: white;
    width: 600px;
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.124);
}

.user-bar-container:hover {
    .user-info {
        opacity: 1;
        transform: translateX(80px);
        z-index: 1000;
    }
}
</style>