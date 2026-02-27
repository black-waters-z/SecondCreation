<template>
    <view class="simple-search">
        <input class="simple-search__input" v-model="key" type="text" placeholder="输入搜索词" @confirm=""
            placeholder-class="simple-search__placeholder" />
        <ScButton type="simple" size="32rpx"><uni-icons type="search" color="" size="24" />&nbsp;点击搜索
        </ScButton>
    </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ScButton from "@/components/common/SCButton/index.vue"
const props = defineProps<{
    modelValue?: string;
}>();
const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();
const key = computed(
    {
        set: (value: string) => {
            emit('update:modelValue', value);
        },
        get: () => {
            return props.modelValue;
        }
    }
)

</script>

<style lang="scss" scoped>
.simple-search {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    padding: 20rpx 0;
    align-items: self-end;

    &__input {
        // background-color: white;
        // border-radius: 50px;
        // box-shadow: $grey-shadow-01;
        border-bottom: 1px solid $border-color;
        padding: 30rpx 30rpx 10rpx 10rpx;
        width: 400px;
        font-weight: 300;
    }

    &__placeholder {
        font-weight: 300;
    }
}
</style>