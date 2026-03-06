<template>
    <view class="ai-dialog" :class="{ 'ai-dialog__active': active }">
        <text class="ai-dialog__content">{{ content }}</text>
    </view>
</template>

<script setup lang="ts">
import { ref, watch, } from 'vue';
const props = defineProps<{
    content: string;
}>();
const active = ref(false);

let timer: ReturnType<typeof setTimeout> | null = null;
watch(() => props.content, () => {
    if (!props.content) return
    active.value = true
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
        active.value = false
        timer = null
    }, 10000)
})
// const displayText = ref('');
// let timer: ReturnType<typeof setTimeout> | null = null;

// 一个字 一个字地输入
// const typeText = (text: string) => {
//     return new Promise((resolve) => {
//         if (timer) {
//             clearInterval(timer);
//         }

//         displayText.value = '';
//         let index = 0;

//         timer = setInterval(() => {
//             if (index < text.length) {
//                 if (displayText.value.length > 40) displayText.value = ''
//                 displayText.value += text[index];
//                 index++;
//             } else {
//                 if (timer) {
//                     clearInterval(timer);
//                     timer = null;
//                     resolve('done');
//                 }
//             }
//         }, random(80, 130));
//     });

// };

// watch(() => props.content, async (newVal) => {
//     if (newVal) {
//         active.value = true;
//         await typeText(newVal);
//         setTimeout(() => {
//             active.value = false;
//         }, 10000);
//     }
// }, { immediate: true });

// onUnmounted(() => {
//     if (timer) {
//         clearInterval(timer);
//     }
// });

</script>

<style lang="scss" scoped>
.ai-dialog {
    font-size: 26rpx;
    background: white;
    box-shadow: $grey-shadow-02;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 20rpx 30rpx;
    display: block;
    width: auto;
    letter-spacing: 2rpx;
    font-weight: 400;
    transition: all 0.2s ease-in-out;
    opacity: 0;
    height: 0;

    &__active {
        transform: translateY(-20rpx);
        opacity: 1;
        height: auto;
    }

    &__content {}
}
</style>