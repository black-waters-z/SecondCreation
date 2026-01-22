<template>
    <!-- styles可以传入grid的列数 -->
    <view class="grid-articles-container">
        <water-fall :water-fall-col-num="isMobile ? 2 : 5" :article-lists="articleList"></water-fall>
    </view>
</template>

<script lang="ts" setup>
import WaterFall from '../WaterFall.vue';
import type { Article } from '@/pages/tagPage/type'
import { isMobile } from "@/utils/index"
defineProps<{
    articleList: Article[];
}>();
</script>

<style scoped lang="scss"></style>
