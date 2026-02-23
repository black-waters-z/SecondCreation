<template>
    <view class="w-full nav-tab">
        <up-sticky class="w-full nav-tab__sticky" bgColor="#fff">
            <up-tabs :list="list" @change="toggleTab">
                <template #right>
                    <view class="nav-tab__filter">
                        <uni-icons fontFamily="CustomFont" type="contact" size="22" @click="isActive = true"
                            style="cursor: pointer;">{{ '\ue74a'
                            }}</uni-icons>
                    </view>
                </template>
            </up-tabs>
        </up-sticky>

        <picker-wrapper v-model="isActive">
            <slot :startFilter="startFilter"></slot>
        </picker-wrapper>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { NavTab } from './type';
import PickerWrapper from '@/components/base/PickerWrapper/index.vue';

defineProps<{ list: NavTab[], navTags?: any }>()
const emit = defineEmits(['changeTab', 'startFilterArticles'])
function toggleTab(e) {
    emit('changeTab', e.index)
}

const isActive = ref(false)

function startFilter(value: any) {
    isActive.value = false
    emit('startFilterArticles', value)
}

</script>

<style lang="scss" scoped>
.nav-tab {
    &__filter {
        padding-right: 20rpx;
    }

    &__sticky {
        z-index: 0 !important;

        :deep(.u-sticky__content) {
            width: 100%;
            display: flex;
            flex-direction: row;
        }

        ::v-deep .u-tabs {
            width: 100%;
        }


        ::v-deep .u-tabs__wrapper__nav__item {
            padding: 0 30rpx;
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