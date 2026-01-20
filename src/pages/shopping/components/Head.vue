<template>
    <view class="w-full shopping-head">
        <view class="shopping-head--search w-full">
            <sc-search></sc-search>
        </view>
        <view class="shopping-head--nav-wrapper">
            <view v-for="(value, idx) in ['画作制品', '文字制品', '棉花制品', '评价']" class="shopping-head--nav"
                :class="{ 'active': activeIndex === idx }" @click="clickNav(idx)">
                {{ value }}
            </view>
        </view>

    </view>
</template>
<script setup lang="ts">
import ScSearch from '@/components/base/ScSearch/index.vue'
import { ref } from 'vue'
const activeIndex = ref(0)

function clickNav(index: number) {
    activeIndex.value = index
}
</script>

<style lang="scss" scoped>
.shopping-head--nav-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    box-sizing: border-box;
    padding: 20rpx;
    padding-top: 0;
}

.shopping-head {
    background-color: #fff;
    z-index: 200;
    box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.1);

    &--nav {
        letter-spacing: 2rpx;
        display: block;
        text-align: center;
        box-sizing: border-box;
        margin: 3rpx;
        border-radius: 100px;
        font-size: 26rpx;
        padding: 4rpx 0;
        transition: all 0.3s ease-in-out;
        opacity: 0.6;
        color: #000;

        &.active {
            font-weight: 600;
            opacity: 1;
            background-color: $border-color;
        }
    }
}
</style>