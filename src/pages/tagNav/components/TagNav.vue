<template>
    <view class="tag-nav-one">
        <Tag :text="tag.name" :closable="false" :bg-color="'gray'" class="tag-nav-one__tag letter-spacing-4"
            @click="navigateToTag">
        </Tag>
    </view>
</template>

<script lang="ts" setup>
import type { Tag as TagType } from '../type';
import Tag from '@/components/common/Tag/index.vue'

const props = defineProps<{
    tag: TagType;
}>();

function navigateToTag() {
    uni.navigateTo({
        url: `/pages/tagPage/index?tag=${props.tag.id}`,
    });
}
</script>

<style lang="scss" scoped>
.tag-nav-one {
    display: inline-block;

    &__tag {
        padding: 10rpx;
    }
}
</style>
