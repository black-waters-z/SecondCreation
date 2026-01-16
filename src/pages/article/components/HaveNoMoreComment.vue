<template>
    <view class="have-no-more-comment">
        <uni-icons type="refresh" size="30"></uni-icons>
        <text>暂无更多评论，下拉刷新其他文章</text>
    </view>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.have-no-more-comment {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    color: $text-muted;
}
</style>