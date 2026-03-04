<template>
    <view class="change-password">
        <uni-section title="修改密码" type="line"></uni-section>
        <uni-easyinput v-model="formData.old_password" type="text" placeholder="输入原密码" class="change-password__input" />
        <uni-easyinput v-model="formData.password_hash" type="text" placeholder="输入修改后密码"
            class="change-password__input" />
        <SCButton type="button" size="26rpx" @click="changePassword" class="change-password__button">修改邮箱</SCButton>
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
function changePassword() {
    if (formData.value.password_hash && formData.value.old_password) emit('submit')
}

</script>

<style lang="scss" scoped>
.change-password {
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