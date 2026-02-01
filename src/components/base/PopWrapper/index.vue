<template>
    <view class="pop-wrapper" :class="{ 'pop-wrapper-active': popShow }" @click.stop @touchend.stop @touchmove.stop
        @touchstart.stop>
        <view class="pop-container" :class="{ 'pop-container-active': popShow }">
            <ClickIcon class="pop-container--icon" :type="['closeempty']" color="#fff" :size="23" @click="changeActive">
            </ClickIcon>
            <view class="pop-container--form">
                <slot></slot>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import ClickIcon from "@/components/base/ClickIcon/index.vue";
const props = defineProps<{ popShow: boolean }>();
const emit = defineEmits(["update:popShow"])
function changeActive() {
    emit("update:popShow", !props.popShow)
}

</script>

<style lang="scss" scoped>
.pop-wrapper {
    transition: all 0.3s ease-in-out;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: -1;
    opacity: 0;

    .pop-container {
        width: 600rpx;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translateY(0) translateX(-50%);
        transition: all 0.3s ease-in-out;

        &--icon {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 10rpx;
        }

        &--form {
            min-height: 400rpx;
            background-color: white;
            border-radius: 10rpx;
            box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
        }
    }

    .pop-container-active {
        transform: translateY(-50%) translateX(-50%);
    }
}

.pop-wrapper-active {
    z-index: 1000;
    opacity: 1;
}
</style>