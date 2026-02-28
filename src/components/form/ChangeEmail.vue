<template>
    <view class="change-email">
        <uni-section title="修改邮箱" type="line"></uni-section>
        <uni-easyinput v-model="formData.email" type="text" placeholder="输入邮箱" class="change-email__input" />
        <SCButton type="button" size="26rpx" @click="changeEmail" class="change-email__button">修改邮箱</SCButton>
    </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import SCButton from '@/components/common/SCButton/index.vue';
import { type UserChange } from '../icon/SettingComponent/type';
const props = defineProps<{
    modelValue: UserChange;
}>();
const emit = defineEmits<{
    (e: 'update:modelValue', value: UserChange): void;
    (e: 'submit'): void;
}>()

const formData = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})
function changeEmail() {
    if (formData.value.email) emit('submit')
}
</script>

<style lang="scss" scoped>
.change-email {
    box-sizing: border-box;

    &__input {
        width: calc(100% - 40rpx);
        margin: 0 20rpx;
        margin-top: 20rpx;
    }

    &__button {
        margin: 60rpx auto;
    }
}
</style>