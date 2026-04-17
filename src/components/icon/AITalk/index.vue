<template>
    <view class="ai-talk">
        <AICharacter></AICharacter>
    </view>
</template>

<script setup lang="ts">


defineOptions({
  options: {
    virtualHost: true,
  },
});import AICharacter from "@/components/ai/aiCharacter/index.vue"
</script>