<template>
    <view class="base--go-back-icon">
        <uni-icons type="left" size="20" @click="goBack" style="cursor:pointer"></uni-icons>
    </view>
</template>

<script setup lang="ts">
function goBack() {
    uni.navigateBack();
}
</script>

<style scoped lang="scss">
.base--go-back-icon {
    top: 10px;
    left: 10px;
    background-color: white;
    z-index: 100;
    border: 1px solid $border-color;
    width: 60rpx;
    height: 60rpx;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>