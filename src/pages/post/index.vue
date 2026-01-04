<template>
  <head-nav></head-nav>
  <go-back title="发布文章"></go-back>
  <write class="w-full weixin-write"></write>
</template>

<script setup lang="ts">
import HeadNav from "@/components/common/HeadNav.vue";
import GoBack from "@/components/common/GoBack.vue";
import Write from "./components/Write.vue";
</script>

<style lang="scss">
.write-container {
  margin: 0 auto;
  margin-top: 80rpx;
}

// #ifdef MP-WEIXIN
.weixin-write {
  margin-top: 80rpx;
}
//#endif
</style>
