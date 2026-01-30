<template>
    <view class="article-data-component">
        <article-data v-for="(item, idx) in [1, 2, 3]"></article-data>
    </view>
</template>

<script setup lang="ts">
import ArticleData from "./ArticleData.vue"
</script>

<style lang="scss" scoped></style>