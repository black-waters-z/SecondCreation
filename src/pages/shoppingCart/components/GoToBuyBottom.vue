<template>
    <view class="go-to-buy-bottom">
        <text class="go-to-buy-bottom__price">&yen;{{ totalPrice }}</text>
        <view class="flex-1 go-to-buy-bottom__bt-box">
            <text class="go-to-buy-bottom__desc">总计6件</text>
            <SCButton type="button" class="go-to-buy-bottom__button" @click="$emit('goToBuy')">点击购买</SCButton>
        </view>
    </view>
</template>

<script setup lang="ts">
import SCButton from "@/components/common/SCButton/index.vue";

defineProps<{ totalPrice: number }>();
defineEmits(["goToBuy"]);
</script>

<style lang="scss" scoped>
.go-to-buy-bottom {
    width: 100%;
    min-height: 100rpx;
    background-color: #fff;
    z-index: 999;
    box-shadow: 0 -2rpx 20rpx rgba(0, 0, 0, 0.066);
    display: flex;


    &__price {
        font-size: 40rpx;
        color: red;
        font-weight: bold;
        align-self: center;
        margin: 0 40rpx;
    }

    &__bt-box {
        align-self: center;
        justify-self: center;
        display: flex;
        justify-content: flex-end;
    }

    &__button {
        font-size: 26rpx;
        height: fit-content;
    }

    &__desc {
        font-size: 26rpx;
        color: #999;
        margin-right: 20rpx;
        align-self: center;
        margin-right: 30rpx;
        font-style: italic;
        text-decoration: underline;
        text-decoration-color: #999;
        text-decoration-thickness: 1rpx;
    }
}
</style>