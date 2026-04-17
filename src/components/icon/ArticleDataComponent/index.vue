<template>
    <view class="article-data-component">
        <article-data v-for="(item, idx) in source" :key="idx" :article-data="item"></article-data>
    </view>
</template>

<script setup lang="ts">


defineOptions({
  options: {
    virtualHost: true,
  },
});import { onLoad } from "@dcloudio/uni-app";
import ArticleData from "./ArticleData.vue"
import type { ArticleDatas } from "./type";
import { getArticleData } from "@/api/chartDataApi"
import { ref } from "vue";
const source = ref<ArticleDatas>();
onLoad(async () => {
    source.value = await getArticleData(1, 10);
});
</script>

<style lang="scss" scoped>
@media screen and (min-width:600px) {
    .article-data-component {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>