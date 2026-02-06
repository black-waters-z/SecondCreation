<template>
    <view class="user-info-component">
        <view class="user-info-component__avatar"></view>
        <view class="user-info-component__name">user</view>
        <view class="user-info-component__info">
            <view class="user-info-component__info__item">

                关注</view>
            <view class="user-info-component__info__item">粉丝</view>
        </view>
    </view>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.user-info-component {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: $border-color;
    box-sizing: border-box;
    padding: 20rpx;

    &__avatar {
        width: 150rpx;
        height: 150rpx;
        border-radius: 50%;
        background-color: pink;
        margin-top: 40rpx;
    }

    &__name {
        font-size: 40rpx;
        font-weight: 600;
        color: $text-main;

    }

    &__info {
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin-top: 40rpx;

        &__item {
            font-size: 30rpx;
            color: white;
            text-shadow: 0 0 10rpx rgba(0, 0, 0, 0.259);
        }
    }
}
</style>