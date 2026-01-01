<template>
  <button
    class="button"
    hover-class="button-hover"
    @click="$emit('click')"
    :class="{
      'button-bt': type === Button.button,
      'button-outline': type === Button.outline,
    }"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
// type: 按钮类型 button outline
enum Button {
  button = "button",
  outline = "outline",
}

defineProps<{ type: string }>();
defineEmits(["click"]);
</script>

<style lang="scss" scoped>
.button {
  border-radius: 100px;
  box-sizing: border-box;
  padding: {
    left: 20px;
    right: 20px;
    border: none;
  }
  line-height: 2;
  box-shadow: 0 0 10px $pink-shadow-01;
}

.button-bt {
  border: 2px solid $pink-300;
  background-color: $pink-300;
  color: white;
  transition: 0.3s ease;
  &:active {
    transform: scale(1.2);
  }
}

.button-outline {
  border: 2px solid $pink-300;
  color: $pink-300;
  background-color: white;
  transition: 0.3s ease;
  &:active {
    transform: scale(1.2);
  }
}
</style>
