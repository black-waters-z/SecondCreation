<template>
  <view class="tag">
    <up-tag :text="text" :size="size || 'mini'" closable @close="closeTag" :bgColor="bgColor" :borderColor="bgColor"
      v-if="closable"></up-tag>
    <up-tag :text="text" :size="size || 'large'" v-if="!closable" :bgColor="bgColor" :borderColor="bgColor"></up-tag>
  </view>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  text: string;
  bgColor?: string;
  closable?: boolean;
  size?: 'medium' | 'large' | 'mini';
}>(), {
  closable: true
});
const emit = defineEmits(['closeTag']);
function closeTag() {
  emit('closeTag');
}
</script>

<style lang="scss" scoped>
.tag {
  display: inline;


}

:deep(.u-tag) {
  border-radius: 100px;
}
</style>
