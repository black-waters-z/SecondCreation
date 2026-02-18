<template>
    <view class="setting-form">
        <change-email v-if="type === 'email'"></change-email>
        <change-password v-if="type === 'password'"></change-password>
        <change-phone v-if="type === 'phone'"></change-phone>
    </view>
</template>

<script setup lang="ts">
import ChangeEmail from '@/components/form/ChangeEmail.vue';
import ChangePassword from '@/components/form/ChangePassword.vue';
import ChangePhone from '@/components/form/ChangePhone.vue';
defineProps<{ type: string }>();
</script>

<style lang="scss" scoped>
::v-deep .uni-section-header__decoration.line {
    background-color: $pink-400;
}

::v-deep .is-focused {
    border-color: $pink-400 !important;
}

.setting-form {
    box-sizing: border-box;
    padding: 10rpx;
}
</style>