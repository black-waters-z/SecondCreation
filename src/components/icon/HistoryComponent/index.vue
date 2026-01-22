<template>
  <water-fall :article-lists="articleLists" :water-fall-col-num="2">
  </water-fall>
</template>

<script setup lang="ts">
import WaterFall from "@/components/common/WaterFall.vue";
import type { ArticleType } from "@/types/index";

const articleLists: ArticleType[] = [];
</script>

<style scoped lang="scss"></style>
