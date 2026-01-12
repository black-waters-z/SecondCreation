<template>
    <view class="w-full tag-container">
        <TagNav v-for="tag in tagList" :key="tag.id" :tag="tag" class="tag-container__item"></TagNav>
    </view>
</template>

<script setup lang="ts">
import TagNav from './TagNav.vue';
import type { Tag } from '../type';
defineProps<{
    tagList: Tag[];
}>();
</script>

<style lang="scss" scoped>
.tag-container {
    &__item {
        box-sizing: border-box;
        margin: 5rpx;
    }
}
</style>
