<template>
  <GridArticlesContainer :article-list="articleLists" type="grid">
  </GridArticlesContainer>
</template>

<script setup lang="ts">
import { getUserViewRecord } from "@/api/articleApi";
import GridArticlesContainer from "@/components/common/GridArticlesContainer/index.vue";
import type { ArticleType } from "@/types/index";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";

const articleLists = ref<ArticleType[]>([]);

onLoad(async () => {
  articleLists.value.push(...(await getUserViewRecord(1) as ArticleType[]));
});
</script>

<style scoped lang="scss"></style>
