<template>
  <page-wrapper show-head class="login-wrapper" :enable_refresh="false">
    <uni-forms class="login-wrapper__form" :modelValue="formData" label-position="top">
      <uni-forms-item class="w-full login-input" label="用户名" name="username">
        <uni-easyinput type="text" v-model="formData.username" placeholder="请输入姓名" />
      </uni-forms-item>
      <uni-forms-item class="w-full login-input" name="password" label="密码">
        <uni-easyinput v-model="formData.password" />
      </uni-forms-item>

      <view class="w-full flex flex-row justify-end">
        <SCButton type="outline" size="26rpx">注册</SCButton>
        <SCButton type="button" @click="submit()" size="26rpx">登录</SCButton>
      </view>
    </uni-forms>
  </page-wrapper>
</template>

<script lang="ts" setup>
import PageWrapper from '@/components/container/PageContainer.vue';
import SCButton from '@/components/common/SCButton/index.vue';
import { ref } from 'vue';
import { post } from '@/utils/request';

interface FormData {
  username: string;
  password: string;
}

const formData = ref<FormData>({
  username: '',
  password: '',
});

async function submit() {
  if (formData.value.username && formData.value.password) {
    const payload = encodeForm({
      grant_type: 'password',
      username: formData.value.username,
      password: formData.value.password,
    });

    const res = await post('/users/login', payload, {
      header: {
        'content-type': 'application/x-www-form-urlencoded', // ??Content-Type
      },
    });
    uni.setStorageSync('token', res.access_token);
    if (res) {
      uni.switchTab({ url: './index' });
    }
  }
}

function encodeForm(data: Record<string, string>) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
}
</script>

<style lang="scss" scoped>
.login-wrapper {
  &__form {
    width: 600rpx;
    box-sizing: border-box;
    padding: 20rpx;
    padding-top: 40rpx;
  }

  .login-input {
    display: flex;
    flex-direction: row;
  }
}
</style>
