<template>
  <view class="tag">
    <up-tag :text="text" size="mini" closable @close="closeTag" :bgColor="bgColor" :borderColor="bgColor"></up-tag>
  </view>
</template>

<script setup lang="ts">
defineProps<{
  text: string;
  bgColor?: string;
}>();
const emit = defineEmits(['closeTag']);
function closeTag() {
  emit('closeTag');
}
</script>

<style lang="scss" scoped>
.tag {
  display: inline;
}
</style>
