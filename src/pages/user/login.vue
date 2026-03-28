<template>
  <page-wrapper show-head class="login-wrapper" :enable_refresh="false" flex-row>
    <!-- 引入轮播图 -->
    <image class="login-wrapper__image" mode="aspectFill" src="/src/static/common/background.jpg"></image>
    <template #scroll>
      <view class="login-form__wrapper">
        <view class="qr-code">
          <text class="qr-code__title"> 二维码扫一扫
          </text>
          <view class="qr-code__image">
            <image class="qr-code__image--img" src="/src/static/common/qrcode.png" mode="aspectFill"></image>
          </view>
          <view class="qr-code__button flex">
            <SCButton type="outline" color="grey" size="26rpx">下载创作域App</SCButton>
            <SCButton type="outline" color="grey" size="26rpx">无障碍模式</SCButton>
          </view>
        </view>
        <uni-forms class="login-wrapper__form" :modelValue="formData" label-position="top">
          <simple-tab :tabs="tabs"></simple-tab>
          <uni-easyinput :inputBorder="false" type="text" v-model="formData.username" placeholder="请输入姓名" />
          <uni-easyinput :inputBorder="false" v-model="formData.password" type="password" placeholder="请输入密码" />
          <view class="login-form__wrapper--item">
            <uni-easyinput :inputBorder="false" v-model="formData.code" type="text" /><text
              class="login-form__wrapper--item-text">获取短信验证码</text>
          </view>

          <view class="w-full flex flex-column login-wrapper__form--button">
            <SCButton type="button" @click="submit()" size="28rpx">登录/注册</SCButton>
          </view>
          <u-divider text="其他方式登录"></u-divider>
          <view class="login-type-container">
            <uni-icons type="weixin" color="green" size="32" class="login-type-container__icon" />
            <uni-icons type="qq" color="blue" size="32" class="login-type-container__icon" />
            <uni-icons type="weibo" color="red" size="32" class="login-type-container__icon" />
          </view>
          <text class="login-form__wrapper--foot">未注册手机验证后自动登录，注册即代表同意《创作域协议》《隐私保护指南》</text>
        </uni-forms>

      </view>

    </template>

  </page-wrapper>
</template>

<script lang="ts" setup>
import PageWrapper from '@/components/container/PageContainer.vue';
import SCButton from '@/components/common/SCButton/index.vue';
import SimpleTab from '@/components/base/ChooseTab/SimpleTab.vue';
import { ref } from 'vue';
import { post } from '@/utils/request';

const tabs = [
  { name: '密码登录' },
  { name: '用户注册' },
]

interface FormData {
  username: string;
  password: string;
  code: string;
}

const formData = ref<FormData>({
  username: '',
  password: '',
  code: '',
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

<style lang="scss">
.login-wrapper {
  &__form {
    width: 600rpx;
    box-sizing: border-box;
    padding: 20rpx;
    padding-top: 100rpx;

  }

  .login-input {
    display: flex;
    flex-direction: row;
  }
}

@media screen and (min-width:600px) {
  .login-type-container {
    display: flex;
    width: 250px;
    margin: 0 auto;
    justify-content: space-between;
    margin-bottom: 20px;

    &__icon {
      background-color: $border-color;
      padding: 10px;
      border-radius: 50%;
      cursor: pointer;
    }
  }

  .login-form__wrapper {
    display: flex;
    width: fit-content;
    background-color: white;
    margin: 0 auto;
    min-height: 522px;
    box-sizing: border-box;
    margin-top: 0px;

    &--foot {
      text-align: center;
      font-size: 24rpx;
      color: $uni-text-color-grey;
    }

    .button {
      width: auto;
      border-radius: 10rpx;
    }

    .uni-easyinput__content-input {
      font-size: 34rpx;

      .uni-easyinput__placeholder-class {
        font-size: 30rpx;
      }
    }


    .uni-easyinput {
      border-bottom: 1px solid $border-color;
      padding: 6px 0px;
    }

    .qr-code {
      width: 344px;
      border-right: 1px solid $border-color;
      box-sizing: border-box;
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      &__title {
        font-size: 32rpx;
        font-weight: 550;
        margin-bottom: 40px;
      }

      &__image {
        width: 150px;
        height: 150px;
        margin-bottom: 80px;

        &--img {
          width: 100%;
          height: 100%;
        }

      }
    }

    .simple-tab {
      font-size: 36rpx;
      justify-content: flex-start;
      gap: 20px;

      &__active {
        font-size: 36rpx;
        font-weight: 550;
      }
    }

    &--item {
      display: flex;

      &-text {
        margin: auto 0;
        cursor: pointer;
        font-size: 28rpx;
        color: $uni-color-primary;
      }
    }
  }

  .login-wrapper {

    &__image {
      position: absolute;
      z-index: 0;
      width: 100%;
      height: 100%;
    }

    .uni-scroll-view-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__form {
      padding-right: 40px;
      padding-left: 40px;
      width: 440px;
      justify-self: center;
      min-height: 300px;
      margin: 0 auto;
      padding-top: 30px;

      &--button {
        margin: 40px 0 20px 0;
      }
    }
  }

  .swiper-container {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  page {
    height: 100%;
  }
}
</style>
