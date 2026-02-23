<template>
    <view class="tip-container">
        <image class="tip-container__icon" lazy-load :src="`${getBaseFileUrl}/static/asset/icon/tip.png`"
            mode="aspectFill" @click="showTip = !showTip" />
        <pop-wrapper class="tip-container__pop-wrapper" v-model:pop-show="showTip">
            <tip-form></tip-form>
        </pop-wrapper>
    </view>
</template>

<script setup lang="ts">
import { getBaseFileUrl } from "@/utils";
import PopWrapper from "@/components/base/PopWrapper/index.vue"
import TipForm from "@/components/form/TipForm.vue";

import { ref } from "vue";
const showTip = ref<boolean>(false)
</script>

<style scoped lang="scss">
.tip-container {
    width: 70rpx;
    justify-content: center;
    align-items: center;
    height: 70rpx;

    &__icon {
        width: 70rpx;
        height: 70rpx;
        transition: all 0.2s ease-in-out;

        &:active {
            transform: scale(0.9);
        }
    }

}
</style>