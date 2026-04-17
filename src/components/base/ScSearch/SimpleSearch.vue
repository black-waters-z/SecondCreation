<template>
    <view class="simple-search">
        <input class="simple-search__input" v-model="key" type="text" placeholder="输入搜索词" @confirm="$emit('confirm')"
            placeholder-class="simple-search__placeholder" />
        <ScButton type="simple" size="32rpx" @click="$emit('confirm')">
            <uni-icons type="search" color="" size="24" />&nbsp;点击搜索
        </ScButton>
    </view>
</template>

<script setup lang="ts">


defineOptions({
  options: {
    virtualHost: true,
  },
});import { computed } from 'vue';
import ScButton from "@/components/common/SCButton/index.vue"
const props = defineProps<{
    modelValue?: string;
}>();
const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
    (e: 'confirm'): void;
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
        font-weight: 300;
    }

    &__placeholder {
        font-weight: 300;
    }
}

@media screen and (min-width:600px) {
    .simple-search {
        height: 60px;

        &__input {
            width: 400px;
        }
    }

}
</style>