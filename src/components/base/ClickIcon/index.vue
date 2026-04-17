<template>
    <view v-if="type && type?.length === 2 && !iconType">
        <view class="icon-wrapper" v-if="!isShow" @click.stop.prevent="toggle">
            <uni-icons :type="type[0]" :size="size" color="#bfbaba"></uni-icons>
            <text class="icon-wrapper__text" v-if="showText">{{ num ?? 0 }}</text>
        </view>
        <view v-else class="icon-wrapper gradient-heart" :class="{ shake: isShaking }" @click.stop.prevent="toggle"
            @animationend="isShaking = false">
            <uni-icons :type="type[1]" :size="size" color="#ff7aa0"></uni-icons>
            <text class="icon-wrapper__text" v-if="showText">{{ (num ?? 0) + 1 }}</text>
        </view>
    </view>
    <view v-else-if="type && type.length === 1 && !iconType" class="icon-wrapper">
        <uni-icons :type="type[0]" :size="size" :color="color ?? '#747272'"></uni-icons>
        <text class="icon-wrapper__text">
            <slot></slot>
        </text>
    </view>
    <view v-else-if="iconType === 'uview'">
        <view class="icon-wrapper" v-if="!isShow" @click.stop="toggle">
            <slot name="icon1"></slot>
            <text v-if="showText">{{ num ?? 0 }}</text>
        </view>
        <view v-else class="icon-wrapper gradient-heart" :class="{ shake: isShaking }" @click.stop="toggle"
            @animationend="isShaking = false">
            <slot name="icon2"></slot>
            <text v-if="showText">{{ (num ?? 0) + 1 }}</text>
        </view>
    </view>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';

defineOptions({
  options: {
    virtualHost: true,
  },
});

const props = defineProps<{ type: string[], size: number, num?: number, showText?: boolean, hasBeenLiked?: boolean, color?: string, iconType?: string, clickFun?: () => void }>()
const isShow = ref(false)

watch(() => props.hasBeenLiked, () => {
    isShow.value = props.hasBeenLiked
}, {
    immediate: true
})

const isShaking = ref(false)

const toggle = async () => {
    isShow.value = !isShow.value
    if (props.clickFun) {
        await props.clickFun()
    }
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
        font-size: 24rpx;
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
