<template>
    <view class="shop-cart">
        <uni-icons type="cart" size="36" color="#fff" @click="navToCart"></uni-icons>
    </view>
</template>
<script setup lang="ts">


defineOptions({
  options: {
    virtualHost: true,
  },
});function navToCart() {
    uni.navigateTo({
        url: '/pages/shoppingCart/index'
    })
}
</script>

<style lang="scss" scoped>
.shop-cart {
    width: 120rpx;
    height: 120rpx;
    position: absolute;
    right: 20rpx;
    bottom: 200rpx;
    background: linear-gradient(135deg,
            rgba(255, 182, 193, 0.9),
            rgba(231, 135, 157, 0.8),
            rgba(194, 97, 122, 0.7));
    border-radius: 50%;
    z-index: 100;
    box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.255);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;

    ::after {
        content: '';
        width: 100%;
        height: 100%;
    }

    &:active {
        transform: scale(0.9);
    }
}
</style>