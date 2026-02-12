<template>
    <view class="image-wrapper" @tap.stop @click.stop @touchend.stop @touchmove.stop @touchstart.stop
        :class="{ 'image-wrapper__active': show }">
        <uni-icons class="image-wrapper__icon" @click="toggleShow" type="close" size="28" color="white"></uni-icons>
        <view scroll-y="true" class="image-wrapper__scroll">
            <image class="image-wrapper__image" :class="{ 'image-wrapper__image__active': show }" :src="image"
                mode="widthFix"></image>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps<{ image: string }>()
const show = ref(false)
function toggleShow() {
    show.value = !show.value
}

defineExpose({ toggleShow })
</script>

<style lang="scss" scoped>
.image-wrapper {
    width: 100%;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease-in-out;
    opacity: 0;
    z-index: -1;

    &__active {
        opacity: 1;
        z-index: 1000;
    }

    &__icon {
        position: fixed;
        right: 20rpx;
        top: 20rpx;
        z-index: 1001;
        text-shadow: 0 0 20rpx rgba(0, 0, 0, 1);
    }

    &__scroll {
        width: 90%;
        overflow-y: auto;
        min-height: 100px;
        max-height: 100vh;
    }

    &__image {
        width: 100%;
        height: min-content;
        transform: scale(0.5);
        transition: all 0.3s ease-in-out;

        &__active {
            transform: scale(1);
        }
    }
}
</style>