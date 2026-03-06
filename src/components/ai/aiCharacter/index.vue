<template>
    <view class="ai-character" v-if="!isMobile"
        :style="{ left: `${x}px`, top: `${y}px`, display: active ? 'flex' : 'none' }" @touchstart="onTouchStart"
        @mousemove="onMouseMove" @mousedown="onMouseDown" @mouseup="onMouseUp" @touchmove.stop.prevent="onTouchMove">
        <u-icon @click.stop="active = false;" @mousedown.stop name="close" color="grey" size="16"
            style="margin-left: auto;"></u-icon>
        <view class="ai-character__dialog">
            <aiDialog :content="messages"></aiDialog>
        </view>
        <view class="ai-character__image">
            <image :src="`${getBaseFileUrl}/static/asset/gif/enqidu.gif`" mode="scaleToFill" class="avatar" />
            <up-loading-icon v-if="isThinking" class="ai-character__icon"></up-loading-icon>
        </view>
        <view class="ai-character__button">
            <uni-easyinput type="textarea" v-model="askAiQuestion" @mousedown.stop placeholder="输入对话..."
                placeholder-class="input-placeholder" @confirm="console.log('confirm')"
                @click.stop="console.log('click')" class="ai-character__input" autoHeight></uni-easyinput>
            <SCButton type="button" size="20rpx" @click="askAiWithStream(askAiQuestion)">提问</SCButton>
        </view>
    </view>
</template>

<script setup lang="ts">
import aiDialog from '@/components/ai/aiDialog/index.vue'
import SCButton from '@/components/common/SCButton/index.vue'
import { getBaseFileUrl } from '@/utils';
import { ref, toRefs } from 'vue';
import { useAiAskStore } from '@/store/useAiAsk';
import { isMobile } from '@/utils';
const active = ref(true);

const {
    onTouchMove,
    onTouchStart,
    askAiWithStream,
    onMouseDown,
    onMouseMove,
    onMouseUp } = useAiAskStore();

const { x,
    y,
    // askAi,
    isThinking,
    askAiQuestion, messages,
} = toRefs(useAiAskStore());
</script>

<style scoped lang="scss">
.ai-character {
    position: fixed;
    width: 300px;
    height: auto;
    z-index: 2000;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    // background-color: aqua;

    &__image {
        position: relative;
        height: 200px;
    }

    &__input {
        z-index: 2000;
    }

    &__dialog {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &__button {
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }

    &__icon {
        position: absolute;
        right: 0;
        top: 0;
    }

    ::v-deep .uni-easyinput__content-textarea {
        min-height: 20px;
    }
}

.avatar {
    width: 200px;
    height: 200px;
}
</style>
