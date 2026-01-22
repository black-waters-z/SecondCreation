<template>
    <view class="w-full">
        <Comment v-for="(item, index) in source?.comments" :key="index" :comment-info="item" show_product />
    </view>
</template>
<script setup lang="ts">
import Comment from '@/components/shop/comment/index.vue'
import type { commentsInfo } from '../type';

defineProps<{
    source?: commentsInfo;
}>()
</script>

<style lang="scss" scoped></style>