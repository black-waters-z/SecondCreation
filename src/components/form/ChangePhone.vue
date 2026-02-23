<template>
    <view class="change-phone">
        <uni-section title="更改手机号" type="line"></uni-section>
        <uni-easyinput v-model="phone" type="text" placeholder="输入手机号" class="change-phone__input" />
        <SCButton type="button" size="26rpx" @click="changephone" class="change-phone__button">修改邮箱</SCButton>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SCButton from '@/components/common/SCButton/index.vue';

const phone = ref('')

function changephone() {
    console.log('changePhone', phone.value);
}
</script>

<style lang="scss" scoped>
.change-phone {
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