<template>
    <view class="change-email">
        <uni-section title="修改邮箱" type="line"></uni-section>
        <uni-easyinput v-model="email" type="text" placeholder="输入邮箱" class="change-email__input" />
        <SCButton type="button" size="26rpx" @click="changeEmail" class="change-email__button">修改邮箱</SCButton>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SCButton from '@/components/common/SCButton/index.vue';

const email = ref('');
function changeEmail() {
    if (email.value) console.log('changeEmail', email.value);
    // changeUserEmail(email.value)
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