<template>
    <view class="w-full nav-tab">
        <up-sticky class="w-full nav-tab__sticky" bgColor="#fff">

            <up-tabs :list="list"></up-tabs>
            <view slot="right" class="flex-1 nav-tab__sticky--right" style="padding-left: 4px;">
                <Tag class="nav-tab__sticky--tag" v-if="nav_tags?.work_tags?.[0]?.name"
                    :text="nav_tags?.work_tags?.[0]?.name" :closable="false" size="medium" :bg-color="'gray'">
                </Tag>
                <Tag class="nav-tab__sticky--tag" v-if="nav_tags?.other_tag?.name" :text="nav_tags?.other_tag?.name"
                    :closable="false" size="medium" :bg-color="'pink'">
                </Tag>
            </view>
        </up-sticky>
    </view>
</template>

<script setup lang="ts">
import type { NavTab } from './type';

import Tag from '@/components/common/Tag/index.vue';
import { computed } from 'vue';
const props = defineProps<{ list: NavTab[], navTags?: any }>()

const nav_tags = computed(() => {
    return props.navTags
})

</script>

<style lang="scss" scoped>
.nav-tab {
    &__sticky {
        :deep(.u-sticky__content) {
            display: flex;
            justify-content: flex-end;
            flex-direction: row;
        }

        &--right {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            box-sizing: border-box;
            padding: 0 16rpx;
        }

        &--tag {
            margin-left: 8rpx;
        }

    }

}


</style>