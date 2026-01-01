<template>
  <view class="w-full"> </view>
</template>

<script setup lang="ts">
import { UserSpeaker } from "./index";
withDefaults(defineProps<{ source: UserSpeaker }>(), {
  source: () => ({
    name: "张三",
    avatar:
      "https://img.alicdn.com/tfs/TB1.Z12GVXXXXXhXFXXXXXXXXXX-1024-1024.png",
    postTime: "2021-01-01 00:00:00",
    speakContent: "这是张三说的话",
  }),
});
</script>

<style lang="scss" scoped></style>
