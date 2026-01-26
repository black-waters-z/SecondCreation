<template>
    <view v-if="type?.length === 2">
        <view class="icon-wrapper" v-if="!isShow" @click="toggle">
            <uni-icons :type="type[0]" :size="size" color="#bfbaba"></uni-icons>
            <text v-if="showText">{{ num ?? 0 }}</text>
        </view>
        <view v-else class="icon-wrapper gradient-heart" :class="{ shake: isShaking }" @click="toggle"
            @animationend="isShaking = false">
            <uni-icons :type="type[1]" :size="size" color="#ff7aa0"></uni-icons>
            <text v-if="showText">{{ (num ?? 0) + 1 }}</text>
        </view>
    </view>
    <view v-else-if="type.length === 1" class="icon-wrapper">
        <uni-icons :type="type[0]" :size="size" :color="color ?? '#747272'"></uni-icons>
        <text class="icon-wrapper__text">
            <slot></slot>
        </text>
    </view>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';
const props = defineProps<{ type: string[], size: number, num?: number, showText?: boolean, hasBeenLiked?: boolean, color?: string }>()
const isShow = ref(false)

watch(() => props.hasBeenLiked, () => {
    isShow.value = props.hasBeenLiked
}, {
    immediate: true
})

const isShaking = ref(false)

const toggle = () => {
    isShow.value = !isShow.value
    if (!isShow.value) {
        isShaking.value = false
        return
    }
    isShaking.value = false
    nextTick(() => { isShaking.value = true })
}
</script>

<style lang="scss" scoped>
.icon-wrapper {
    display: inline-flex;

    &__text {
        font-size: 20rpx;
        font-style: italic;
        display: flex;
        align-items: center;
    }
}

.shake {
    animation: shake 0.2s ease-in-out;
    transform-origin: center bottom; // shake around the bottom
}

// .gradient-heart :deep(.uni-icons) {
//     background: radial-gradient(circle at 50% 50%, #ff2b40 0%, #ff2b40 40%, #b30026 70%, #2a0008 100%) !important;
//     -webkit-background-clip: text;
//     color: transparent;
// }

@keyframes shake {
    0% {
        opacity: 0.1;
    }

    25% {
        opacity: 0.3;
    }

    50% {
        opacity: 0.5;
    }

    75% {
        opacity: 0.7;
    }

    100% {
        opacity: 1;
    }
}
</style>
