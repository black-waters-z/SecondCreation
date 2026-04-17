<template>
    <view class="simple-tab">
        <view v-for="(item, idx) in tabs" class="simple-tab__item" :key="idx"
            :class="{ 'simple-tab__active': active === idx }" @click="changeTab(idx)">{{ item.name }}
        </view>
    </view>
</template>

<script setup lang="ts">


defineOptions({
  options: {
    virtualHost: true,
  },
});import { ref } from 'vue';
defineProps<{ tabs: Record<'name', string>[] }>();
const active = ref(0)
const emit = defineEmits(['changeTab'])
function changeTab(idx: number) {
    active.value = idx
    emit('changeTab', idx)
}
</script>

<style lang="scss" scoped>
.simple-tab {
    display: flex;
    justify-content: space-around;
    padding: 10px 0;
    font-size: 26rpx;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 100;

    .simple-tab__item {
        cursor: pointer;
    }
}

.simple-tab__active {
    font-weight: bold;
    font-size: 28rpx;
}
</style>