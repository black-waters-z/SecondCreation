<template>
  <page-wrapper show-head class="login-wrapper">
    <uni-forms class="login-wrapper__form" :modelValue="formData" label-position="top">
      <uni-forms-item class="w-full login-input" label="用户名" name="username">
        <uni-easyinput type="text" v-model="formData.username" placeholder="请输入姓名" />
      </uni-forms-item>
      <uni-forms-item class="w-full login-input" name="password" label="密码">
        <uni-easyinput v-model="formData.password" />
      </uni-forms-item>

      <view class="w-full flex flex-row justify-end">
        <SCButton type="outline">注册</SCButton>
        <SCButton type="button" @click="submit()">登录</SCButton>
      </view>
    </uni-forms>
  </page-wrapper>
</template>

<script lang="ts" setup>
import PageWrapper from '@/components/container/PageContainer.vue';
import SCButton from '@/components/common/SCButton/index.vue';
import { ref } from 'vue';
import { post } from '@/utils/request';
import { parseToken } from '@/utils/security';

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
    const form = new URLSearchParams({
      grant_type: 'password',
    })
    form.append('username', formData.value.username)
    form.append('password', formData.value.password)
    const res = await post('/users/login', formData.value, {
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
