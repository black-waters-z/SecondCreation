<template>
  <page-wrapper show-head class="login-wrapper" :enable_refresh="false" flex-row>
    <!-- 引入轮播图 -->
    <image class="login-wrapper__image" mode="aspectFill" src="/src/static/common/background.jpg"></image>
    <template #scroll>
      <view class="login-form-father__wrapper">
        <view class="login-form__wrapper">
          <view class="qr-code">
            <text class="qr-code__title"> 二维码扫一扫 </text>
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
              <SCButton class="w-full" type="button" @click="submit()" size="28rpx">登录/注册</SCButton>
            </view>
            <u-divider text="其他方式登录"></u-divider>
            <view class="login-type-container">
              <uni-icons type="weixin" size="32" color="#52c41a" class="login-type-container__icon" />
              <uni-icons type="qq" size="32" color="#1890ff" class="login-type-container__icon" />
              <uni-icons type="weibo" size="32" color="#ff4d4f" class="login-type-container__icon" />
            </view>
            <text class="login-form__wrapper--foot">未注册手机验证后自动登录，注册即代表同意《创作域协议》《隐私保护指南》</text>
          </uni-forms>
        </view>
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

const tabs = [{ name: '密码登录' }, { name: '用户注册' }];

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
page {
  height: 100%;
}

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

@media screen and (min-width: 600px) {
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

  .login-form-father__wrapper {
    height: 100%;
    display: flex;
    align-items: center;
  }

  .login-form__wrapper {
    display: flex;
    width: 800px;
    border-radius: 25px;
    background-color: white;
    margin: 0 auto;
    min-height: 443px;
    box-sizing: border-box;
    cursor: pointer;

    &:hover {
      box-shadow: 0px 0px 10px rgba($color: #838383, $alpha: 0.3);
    }

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
        color: $pink-color;
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

@media screen and (max-width: 600px) {
  .login-wrapper__image {
    position: absolute;
    z-index: 0;
    height: calc(100% - 80rpx);
    width: 100%;
  }

  .login-form-father__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 20rpx;
    box-sizing: border-box;
  }

  .qr-code {
    display: none;
  }

  .login-wrapper__form {
    background: white;
    border-radius: 20rpx;
    padding: 40rpx 30rpx;
    box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    border: 1rpx solid rgba(255, 255, 255, 0.2);
    width: 100%;
    max-width: 650rpx;
    margin: 0 auto;

    .button-bt {
      width: 80%;
      align-self: center;
    }
  }

  .uni-forms {
    .uni-easyinput {
      margin-bottom: 24rpx;

      &__content-input {
        font-size: 32rpx;
        padding: 16rpx 0;

        .uni-easyinput__placeholder-class {
          font-size: 28rpx;
          color: #999;
        }
      }
    }

    .simple-tab {
      margin-bottom: 32rpx;
      font-size: 34rpx;

      &__active {
        font-weight: 600;
        color: $uni-color-primary;
      }
    }
  }

  .login-form__wrapper--item {
    display: flex;
    align-items: center;
    margin-bottom: 24rpx;
    border-bottom: 1rpx solid $border-color;
    padding: 8rpx 0;

    .uni-easyinput {
      flex: 1;
      margin-bottom: 0;
      border-bottom: none;
    }

    &-text {
      color: $uni-color-primary;
      font-size: 28rpx;
      font-weight: 500;
      cursor: pointer;
      white-space: nowrap;
      padding-left: 16rpx;

      &:active {
        opacity: 0.7;
      }
    }
  }

  .login-wrapper__form--button {
    margin: 40rpx 0 24rpx 0;

    .sc-button {
      height: 88rpx;
      border-radius: 44rpx;
      font-size: 32rpx;
      font-weight: 600;
      box-shadow: 0 4rpx 16rpx rgba($uni-color-primary, 0.3);

      &:active {
        transform: translateY(2rpx);
        box-shadow: 0 2rpx 8rpx rgba($uni-color-primary, 0.2);
      }
    }
  }

  .u-divider {
    margin: 32rpx 0;

    &__text {
      font-size: 26rpx;
      color: #999;
    }
  }

  .login-type-container {
    display: flex;
    justify-content: center;
    gap: 40rpx;
    margin: 24rpx 0 32rpx 0;

    &__icon {
      background-color: #f8f9fa;
      padding: 20rpx;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.3s ease;

      &:active {
        transform: scale(0.95);
        background-color: #f1f3f4;
      }

      &[type='weixin'] {
        color: #52c41a;
      }

      &[type='qq'] {
        color: #1890ff;
      }

      &[type='weibo'] {
        color: #ff4d4f;
      }
    }
  }

  .login-form__wrapper--foot {
    text-align: center;
    font-size: 24rpx;
    color: #999;
    line-height: 1.5;
    padding: 0 10rpx;
  }
}

// #ifdef MP-WEIXIN
.login-wrapper {
  height: 100%;
}

.login-wrapper__image {
  display: none;
}

.login-form-father__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 20rpx;
  box-sizing: border-box;
  width: 100%;

  .button-bt {
    width: 100% !important;
  }
}

.qr-code {
  display: none;
}

.login-wrapper__form {
  background: white;
  border-radius: 20rpx;
  padding: 40rpx 30rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1rpx solid rgba(255, 255, 255, 0.2);
  width: 100%;
  max-width: 650rpx;
  margin: 0 auto;

  .button-bt {
    width: 80%;
    align-self: center;
  }
}

.uni-forms {
  .uni-easyinput {
    margin-bottom: 24rpx;

    &__content-input {
      font-size: 32rpx;
      padding: 16rpx 0;

      .uni-easyinput__placeholder-class {
        font-size: 28rpx;
        color: #999;
      }
    }
  }

  .simple-tab {
    margin-bottom: 32rpx;
    font-size: 34rpx;

    &__active {
      font-weight: 600;
      color: $uni-color-primary;
    }
  }
}

.login-form__wrapper--item {
  display: flex;
  align-items: center;
  margin-bottom: 24rpx;
  border-bottom: 1rpx solid $border-color;
  padding: 8rpx 0;

  .uni-easyinput {
    flex: 1;
    margin-bottom: 0;
    border-bottom: none;
  }

  &-text {
    color: $uni-color-primary;
    font-size: 28rpx;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    padding-left: 16rpx;

    &:active {
      opacity: 0.7;
    }
  }
}

.login-wrapper__form--button {
  margin: 40rpx 0 24rpx 0;

  .sc-button {
    height: 88rpx;
    border-radius: 44rpx;
    font-size: 32rpx;
    font-weight: 600;
    box-shadow: 0 4rpx 16rpx rgba($uni-color-primary, 0.3);

    &:active {
      transform: translateY(2rpx);
      box-shadow: 0 2rpx 8rpx rgba($uni-color-primary, 0.2);
    }
  }
}

.u-divider {
  margin: 32rpx 0;

  &__text {
    font-size: 26rpx;
    color: #999;
  }
}

.login-type-container {
  display: flex;
  justify-content: center;
  gap: 40rpx;
  margin: 24rpx 0 32rpx 0;

  &__icon {
    background-color: #f8f9fa;
    padding: 20rpx;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;

    &:active {
      transform: scale(0.95);
      background-color: #f1f3f4;
    }

    &[type='weixin'] {
      color: #52c41a;
    }

    &[type='qq'] {
      color: #1890ff;
    }

    &[type='weibo'] {
      color: #ff4d4f;
    }
  }
}

.login-form__wrapper--foot {
  text-align: center;
  font-size: 24rpx;
  color: #999;
  line-height: 1.5;
  padding: 0 10rpx;
}

// #endif</style>
