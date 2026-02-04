<template>
    <view class="draft-componnet">
        <Draft v-for="(item, idx) in [1, 2, 3, 4]"></Draft>
    </view>
</template>

<script setup lang="ts">
import Draft from './Draft.vue';

</script>

<style lang="scss" scoped></style>