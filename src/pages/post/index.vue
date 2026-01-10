<template>
  <page-wrapper class="flex flex-1 mh-0" show-head>
    <go-back class="w-full position-sticky top-0 z-100" title="发布文章"></go-back>
    <template #scroll>
      <write class="w-full weixin-write"></write>
    </template>
  </page-wrapper>
</template>

<script setup lang="ts">
import GoBack from '@/components/common/GoBack.vue';
import Write from './components/Write.vue';
import PageWrapper from '@/components/container/PageContainer.vue';
</script>

<style lang="scss"></style>
