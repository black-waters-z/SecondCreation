<template>
    <view class="base--go-back-icon">
        <uni-icons type="left" size="20" @click="goBack" style="cursor:pointer"></uni-icons>
    </view>
</template>

<script setup lang="ts">


defineOptions({
  options: {
    virtualHost: true,
  },
});function goBack() {
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

@media screen and (min-width:600px) {
    .base--go-back-icon {
        background: rgba(255, 255, 255, 0.8);
    }
}
</style>