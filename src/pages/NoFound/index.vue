<template>
  <page-wrapper show-head>
    <template #scroll>
      <not-found></not-found>
    </template>
  </page-wrapper>
</template>

<script setup lang="ts">
import PageWrapper from "@/components/container/PageContainer.vue"
import NotFound from "@/components/base/NotFound/index.vue"
</script>
