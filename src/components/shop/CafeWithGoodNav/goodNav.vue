<template>
    <view class="good-nav">
        <view class="good-nav__item" v-for="(value, idx) in [1, 2, 3, 4]" :key="idx">
            <image class="good-nav__item--img" src="" mode="aspectFill">
            </image>
            <text class="good-nav__item--title">【春中声色】采珠子</text>
        </view>
    </view>
</template>
<script setup lang="ts">
</script>

<style lang="scss" scoped>
.good-nav {
    display: inline-flex;

    &__item {
        box-sizing: border-box;
        margin: 10rpx 20rpx;
        width: 248rpx;
        position: relative;

        &--img {
            width: 100%;
            height: 160rpx;
            border-radius: 15rpx;
            background-color: $border-color;
        }

        &--title {
            width: 100%;
            display: flex;
            justify-content: center;
            font-size: 20rpx;
            color: $text-muted;
            font-style: italic;
            opacity: 0.7;
        }
    }

}
</style>