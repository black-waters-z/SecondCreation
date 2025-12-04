<template>
  <water-fall :article-lists="articleLists" :water-fall-col-num="2">
  </water-fall>
</template>

<script setup lang="ts">
import WaterFall from "@/components/common/WaterFall.vue";
import type { Article as ArticleType } from "@/types/index";

const articleLists: ArticleType[] = [
  { title: "", author: "作者1", image: "/static/character/character1.png" },
  { title: "", author: "作者2", content: "我是一只小小小鸟啊啊啊" },
  { title: "", author: "作者3" },
  { title: "", author: "作者4" },
  { title: "", author: "作者5" },
  { title: "1221121", author: "wangwu" },
];
</script>

<style scoped lang="scss"></style>
