<template>
    <view class="user-info-tab">
        <view class="w-full flex">
            <view class="user-info-tab-item" :class="{ active: activeTab === index }" v-for="(item, index) in tabs"
                :key="index" @click="setActiveTab(index)">
                <view class="user-info-tab-item-icon">
                </view>
                <view class="user-info-tab-item-text">{{ item }}</view>
            </view>
        </view>
        <view class="indicator" :style="{ left: indicatorPosition }"></view>
    </view>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { computed } from 'vue';

const props = defineProps<{ current: number }>()
const emit = defineEmits(['update:current']);
const tabs = ['我的收藏', '我的文章', '我的合集'];
const activeTab = ref(props.current);
watch(() => props.current, (newVal) => {
    activeTab.value = newVal
});

function setActiveTab(index: number) {
    activeTab.value = index;
    emit('update:current', index);
}

const indicatorPosition = computed(() => {
    return `${activeTab.value * 33.33}%`; // 假设每个 tab 占据 1/3 的宽度
});
</script>

<style lang="scss" scoped>
.user-info-tab {
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 10rpx;
    margin-bottom: 20rpx;
    font-size: 26rpx;

    .user-info-tab-item {
        flex: 1;
        display: flex;
        justify-content: center;
        box-sizing: border-box;
        padding: 10rpx;
        border-bottom: $border-color solid 1rpx;
        opacity: 0.4;
    }

    .active {
        opacity: 1;
    }

}

.indicator {
    position: relative;
    height: 4rpx;
    width: calc(33.33% - 75px);
    margin: 0 37.5px;
    box-sizing: border-box;
    /* 每个 tab 的宽度 */
    background-color: $pink-300;
    /* 指示条颜色 */
    transition: left 0.3s ease;
    /* 平滑过渡效果 */
}
</style>