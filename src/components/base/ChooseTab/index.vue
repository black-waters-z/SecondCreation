<template>
    <view class="choose-tab">
        <view class="choose-tab__item" @click="choose('date')" :class="{ active: isActiveIdx === 'date' }">本周</view>
        <view class="choose-tab__item" @click="choose('week')" :class="{ active: isActiveIdx === 'week' }">本月</view>
        <view class="choose-tab__item" @click="choose('month')" :class="{ active: isActiveIdx === 'month' }">近年</view>
    </view>
</template>

<script setup lang="ts">


defineOptions({
  options: {
    virtualHost: true,
  },
});import { ref } from 'vue';
const isActiveIdx = ref<'week' | 'month' | 'date'>('date')
const emit = defineEmits(['choose'])
function choose(idx: 'week' | 'month' | 'date') {
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