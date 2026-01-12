<template>
    <navigator open-type="switchTab" :url="`/pages/tagPage/index?tag=${tag.id}`" class="tag-nav-one">
        <Tag :text="tag.name" :closable="false" :bg-color="'gray'" class="tag-nav-one__tag letter-spacing-4"></Tag>
    </navigator>
</template>

<script lang="ts" setup>
import type { Tag as TagType } from '../type';
import Tag from '@/components/common/Tag/index.vue'

defineProps<{
    tag: TagType;
}>();
</script>

<style lang="scss" scoped>
.tag-nav-one {
    display: inline-block;

    &__tag {
        padding: 10rpx;
    }
}
</style>