<template>
    <view class="notFoundIcon"><text>
            (。・＿・。)
        </text>
        <text> 404 not found </text>
        <text>
            I’m sorry~暂时搜索不到！
        </text>
    </view>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.notFoundIcon {
    width: 100%;
    height: 400rpx;
    display: flex;
    gap: 40rpx;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: $text-muted;
    font-weight: 600;
}
</style>