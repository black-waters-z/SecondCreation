<template>
  <button class="button" hover-class="button-hover" @click="$emit('click')" :class="{
    'button-bt': type === Button.button,
    'button-outline': type === Button.outline,
  }" :style="{ background: color, border: color, fontSize: size }">
    <text :style="{ lineHeight: 1 }">
      <slot></slot>
    </text>
  </button>
</template>

<script setup lang="ts">
// type: 按钮类型 button outline
enum Button {
  button = 'button',
  outline = 'outline',
}

defineProps<{ type: string, color?: string, size?: string }>();
defineEmits(['click']);
</script>

<style lang="scss" scoped>
.button {
  border-radius: 100px;
  box-sizing: border-box;
  box-sizing: border-box;
  display: block;
  margin-left: 0;
  margin-right: 0;
  margin: 10rpx;
  width: fit-content;
  justify-content: center;
  align-items: center;
  padding: 5rpx 30rpx;
  line-height: 2;
  box-shadow: 0 0 10px $pink-shadow-01;
}

.button-bt {
  border: none;
  background: $pink-linear-gradient-02;
  color: white;
  transition: 0.3s ease;

  &:active {
    transform: scale(0.9);
  }

  &::after {
    border: none;
  }
}

.button-outline {
  border: 2rpx solid $pink-400;

  color: $pink-400;
  background: none;
  transition: 0.3s ease;

  &:active {
    transform: scale(0.9);
  }

  &::after {
    border: none;
  }
}

:deep(.uni-button:after) {
  border: none;
}
</style>
