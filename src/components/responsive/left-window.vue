<template>
  <view class="left-window-container">
    <CharacterNav></CharacterNav>
  </view>
</template>

<script setup lang="ts">
import CharacterNav from "@/pages/index/components/CharacterNav.vue";
</script>

<style scoped lang="scss">
.left-window-container {
  width: 100%;
  height: 60vh;

  .character-nav-container {
    flex-direction: column;
  }
}
</style>
