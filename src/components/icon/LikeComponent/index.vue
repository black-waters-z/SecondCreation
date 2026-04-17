<template>
  <GridArticleContainer :article-list="articleList" type="grid"></GridArticleContainer>
</template>

<script setup lang="ts">


defineOptions({
  options: {
    virtualHost: true,
  },
});import GridArticleContainer from "@/components/common/GridArticlesContainer/index.vue"
import { getLikeArticles } from "@/api/articleApi"
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import type { Article } from "@/pages/tagPage/type";

const articleList = ref<Article[]>([])
onLoad((options) => {
  getLikeArticles().then((res) => {
    articleList.value = res;
  });
})
</script>

<style lang="scss" scoped></style>
