<template>
  <view class="content">
    <post-sheet></post-sheet>
    <post-sheet-show></post-sheet-show>
  </view>
</template>

<script setup lang="ts">
import PostSheet from "@/components/common/PostSheet.vue";
import PostSheetShow from "@/components/common/PostSheetShow.vue";
</script>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
