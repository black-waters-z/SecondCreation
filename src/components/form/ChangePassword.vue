<template>
    <view class="change-password">
        <uni-section title="修改密码" type="line"></uni-section>
        <uni-easyinput v-model="passwordInput.passwordOld" type="text" placeholder="输入原密码"
            class="change-password__input" />
        <uni-easyinput v-model="passwordInput.passwordNew" type="text" placeholder="输入修改后密码"
            class="change-password__input" />
        <SCButton type="button" size="26rpx" @click="changePassword" class="change-password__button">修改邮箱</SCButton>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SCButton from '@/components/common/SCButton/index.vue';

const passwordInput = ref({
    passwordOld: '',
    passwordNew: ''
});

function changePassword() {
    console.log('changePassword', passwordInput.value);
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