<template>
    <view class="products-wrapper">
        <product v-for="(value, idx) in info ?? [1, 2, 3, 4, 5, 6, 7, 8, 9]" :key="idx" :good-info="value"></product>
    </view>
</template>
<script setup lang="ts">
import Product from "@/components/shop/product/index.vue"
import type { goodInfo } from "../type"

defineProps<{
    info: goodInfo[];
}>()
</script>
<style lang="scss" scoped>
.products-wrapper {
    // background-color: white;
    margin-top: 20rpx;
    box-sizing: border-box;
    padding: 0 20rpx;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20rpx;
}
</style>