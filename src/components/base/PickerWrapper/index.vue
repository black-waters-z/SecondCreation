<template>
    <view class="w-full picker-wrapper" :class="{ 'active': modelValue }" @click="emitModelValue(!modelValue)">
        <view class="picker-form" :class="{ 'form-active': modelValue }" @click.stop="stop()">
            <slot></slot>
        </view>
    </view>
</template>

<script setup lang="ts">
import { debounce } from 'lodash'
defineProps<{
    modelValue: boolean
}>()
const emit = defineEmits<{
    (e: 'update:modelValue', val: boolean): void
}>()
const emitModelValue = debounce((val: boolean) => {
    emit('update:modelValue', val)
})
function stop() {
    return
}
</script>

<style lang="scss" scoped>
.picker-wrapper {
    height: 100vh;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: -1;
    opacity: 0;
    pointer-events: none;
    transition: all 0.5s ease-in-out;

    .picker-form {
        transition: all 0.5s ease-in-out;
        width: 100%;
        height: auto;
        min-height: 300px;
        background-color: white;
        border-radius: 20px 20px 0 0;
        position: absolute;
        bottom: 0;
        transform: translateY(100%);
        padding: 20rpx;
        box-sizing: border-box;
    }
}

.active {
    background-color: rgba(75, 74, 74, 0.337);
    z-index: 1000;
    opacity: 1;
    pointer-events: auto;

    .form-active {
        bottom: 0;
        transform: translateY(0);
    }
}
</style>
