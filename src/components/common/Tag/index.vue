<template>
  <view class="tag">
    <up-tag class="tag__item" :text="text" :size="size || 'mini'" closable @close="closeTag" :bgColor="bgColor"
      :borderColor="bgColor" v-if="closable" @tap="handleClick"></up-tag>
    <up-tag :text="text" :size="size || 'large'" v-if="!closable" :bgColor="bgColor" :borderColor="bgColor"
      @tap="handleClick"></up-tag>
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

defineOptions({
  options: {
    styleIsolation: 'shared',
  },
});
const emit = defineEmits(['closeTag', 'click']);
function closeTag() {
  emit('closeTag');
}
function handleClick() {
  emit('click');
}
</script>

<style lang="scss" scoped>
.tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

:deep(.u-tag) {
  border-radius: 100px;
}
</style>
