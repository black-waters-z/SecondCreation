<template>
    <view class="grid">
        <view class="grid-item" v-for="(item, idx) in articleList" :key="idx">
            <small-article :article="item"></small-article>
        </view>
    </view>
</template>

<script setup lang="ts">
import type { Article } from '@/pages/tagPage/type'
import SmallArticle from '../Article/SmallArticle.vue';
defineProps<{
    articleList: Article[];
}>();
</script>

<style lang="scss" scoped>
.grid {
    margin-top: 10rpx;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    padding: 5rpx;

    .grid-item {
        width: 100%;
    }
}
</style>