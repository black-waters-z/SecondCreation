<template>
    <view class="have-no-more">
        <uni-icons type="refresh" size="30"></uni-icons>
        <text>上划加载更多...</text>
    </view>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.have-no-more {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    color: $text-muted;
}
</style>