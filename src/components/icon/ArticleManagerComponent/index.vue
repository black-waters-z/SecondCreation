<template>
    <view class="article-manager-component">
        <article-manage v-for="item in [1, 2, 3, 4]"></article-manage>
    </view>
</template>

<script lang="ts" setup>
import ArticleManage from './ArticleManage.vue';
</script>

<style lang="scss" scoped></style>