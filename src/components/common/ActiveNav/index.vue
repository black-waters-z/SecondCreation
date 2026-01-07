<template>
  <template v-if="type == 'icon'" class="w-full"> <nav-with-icon></nav-with-icon> </template>
</template>

<script lang="ts" setup>
import NavWithIcon from './NavWithIcon.vue';
defineProps<{ type: string }>();
</script>

<style lang="scss">
@font-face {
  font-family: CustomFont;
  src: url('../../../static/iconfont.ttf');
}
</style>
