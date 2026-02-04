<template>
    <view class="choose-tab">
        <view class="choose-tab__item" @click="choose('week')" :class="{ active: isActiveIdx === 'week' }">本周</view>
        <view class="choose-tab__item" @click="choose('month')" :class="{ active: isActiveIdx === 'month' }">本月</view>
        <view class="choose-tab__item" @click="choose('year')" :class="{ active: isActiveIdx === 'year' }">近年</view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const isActiveIdx = ref<'week' | 'month' | 'year'>('week')
const emit = defineEmits(['choose'])
function choose(idx: 'week' | 'month' | 'year') {
    isActiveIdx.value = idx
    emit('choose', idx)
}
</script>

<style lang="scss" scoped>
.choose-tab {
    display: flex;
    gap: 20rpx;
    width: fit-content;
    font-size: 25rpx;

    .choose-tab__item {
        padding: 10rpx 20rpx;
        border-radius: 10rpx;
        border-radius: 10rpx;
        background-color: $uni-bg-color-grey;
    }

    .active {
        background-color: $text-muted;
        color: $uni-bg-color-grey;
        opacity: 0.6;
    }
}
</style>