<template>
    <view class="swiper-wrapper">
        <swiper class="swiper" :current="currentIdx" @change="changeCurrent">
            <swiper-item>
                <slot name="a"></slot>
            </swiper-item>
            <swiper-item>
                <slot name="b"></slot>
            </swiper-item>
            <swiper-item>
                <slot name="c"></slot>
            </swiper-item>
        </swiper>
    </view>
</template>

<script setup lang="ts">


defineOptions({
  options: {
    virtualHost: true,
  },
});import { ref, watch } from 'vue'
const props = defineProps<{ current: number }>();
const currentIdx = ref<number>(props.current);
const emit = defineEmits(['update:current']);

function changeCurrent(e: any) {
    currentIdx.value = e.detail.current
}

watch(() => props.current, (newVal) => {
    currentIdx.value = newVal
});

watch(() => currentIdx.value, (newVal) => {
    emit('update:current', newVal)
},
    {
        immediate: true
    })
</script>

<style lang="scss" scoped>
.swiper-wrapper {
    width: 100%;
    height: 100%;

    .swiper {
        width: 100%;
        height: 100%;
    }
}
</style>