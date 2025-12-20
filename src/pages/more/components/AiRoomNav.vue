<template>
  <view class="ai-room-nav w-100">
    <view class="ai-room-nav__container w-100">
      <AiRoom v-for="value in [1, 2, 3, 4, 5, 6, 7]" class="w-100"></AiRoom>
      <AiRoom v-for="value in [1, 2, 3, 4, 5, 6, 7]" class="w-100"></AiRoom>
    </view>
  </view>
</template>
<script setup lang="ts">
import AiRoom from "@/components/common/AiRoom/index.vue";
</script>
<style lang="scss">
.ai-room-nav {
  justify-content: center;
  position: relative;
  &__container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    background-color: white;
    gap: 10px;
  }
}

@media (min-width: 600px) {
  .ai-room-nav {
    &__container {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}

@media screen and (min-width: 900px) {
  .ai-room-nav {
    &__container {
      grid-template-columns: repeat(5, 1fr);
    }
  }
}
</style>
