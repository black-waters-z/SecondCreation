<!-- 小商店和商品的导航，也就是放在一个栏里，一行。最左边是商店，右边是商品，参照拼夕夕 -->
<template>
    <view class="cafe-with-good-nav">
        <view class="cafe-with-good-nav__left">
            <image class="cafe-with-good-nav__left--img" :src="source?.storeOwner.avatar ?? '#'" mode="aspectFill">
            </image>
        </view>
        <view class="cafe-with-good-nav__right">
            <good-nav :source="source?.Goods"></good-nav>
        </view>
    </view>
</template>

<script setup lang="ts">


defineOptions({
    options: {
        virtualHost: true,
    },
}); import goodNav from './goodNav.vue';
import type { storeInfo } from './type'

defineProps<{ source: storeInfo }>();
</script>

<style lang="scss" scoped>
.cafe-with-good-nav {
    display: flex;
    flex-direction: row;
    background-color: white;
    box-sizing: border-box;
    padding: 20rpx;
    position: relative;

    &__left {
        width: 250rpx;

        &--img {
            width: 100%;
            height: 220rpx;
            min-height: 220rpx;

            &::after {
                content: "店铺名字";
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 100rpx;
                // #ifdef H5
                background: linear-gradient(to top, #000 0%, transparent 70%);
                // #endif
                color: #f8f6f6;
                font-size: 23rpx;
                box-sizing: border-box;
                padding: 10rpx 10rpx;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                text-shadow: 0 0 0 10rpx #000;
            }
        }
    }

    &__right {
        flex: 1;
        overflow-x: auto;
        min-height: 0;
    }
}
</style>