<template>
    <view class="have-no-more">
        <uni-icons class="have-no-more__icon" type="refresh" size="30"></uni-icons>
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

    &__icon {
        animation: scroll 1s ease-in-out infinite;
    }
}

@keyframes scroll {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>