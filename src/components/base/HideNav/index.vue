<template>
    <view class="hide-nav flex">
        <view class="hide-nav__read-nav__split" v-if="isMobile"></view>
        <text class="hide-nav__read-nav__text" v-if="isMobile">{{ text }}</text>
        <uni-icons :type="type[active]" color="grey" size="19" style="margin-left: auto;"
            @click="active = (active + 1) % 2" />
    </view>
    <view class="hide-nav__read-nav__container" v-show="active % 2 === 0">
        <slot></slot>
    </view>
</template>

<script setup lang="ts">
import { isMobile } from '@/utils';
import { ref } from 'vue';
defineProps<{ text: string }>()
const type = ['down', 'up']
const active = ref(1);
</script>

<style scoped lang="scss">
.hide-nav {
    display: flex;
    align-items: center;
    padding: 10px 10px;
    height: 40rpx;
    background-color: white;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

    &__read-nav__text {
        letter-spacing: 2rpx;
        height: 20px;
        font-size: 26rpx;
        margin-left: 20rpx;
        font-weight: 600;
        color: $text-main;
    }

    &__read-nav__container {
        width: 100%;

    }
}
</style>