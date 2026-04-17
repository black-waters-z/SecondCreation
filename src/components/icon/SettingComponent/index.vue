<template>
    <view class="setting-component">
        <view class="setting-component__avatar" @click="popShow = true; settingFormType = 'avatar';">
            <uni-icons fontFamily="CustomFont" color="white" size="24"> &#xe61c; </uni-icons>
            <image :src="userInfo?.avatar_url" mode="aspectFill" class="setting-component__avatar-img"></image>
        </view>
        <view class="setting-component__name">{{ userInfo?.username }}</view>
        <view class="setting-component__wallet">
            <text class="setting-component__wallet__item">积分：xxx</text>
            <text class="setting-component__wallet__item">余额：xxx</text>
        </view>
        <view class="setting-component__other-setting">
            <view class="setting-component__other-setting__item">绑定邮箱：
                <text class="setting-component__other-setting__item-answer">{{ userInfo?.email }}</text>
                <uni-icons type="compose" size="20" @click="popShow = true; settingFormType = 'email';"
                    class="setting-component__other-setting__item-edit"></uni-icons>
            </view>
            <view class="setting-component__other-setting__item">绑定手机：
                <text class="setting-component__other-setting__item-answer">19693***782</text>
                <uni-icons type="compose" size="20" @click="popShow = true; settingFormType = 'phone';"
                    class="setting-component__other-setting__item-edit"></uni-icons>
            </view>
            <view class="setting-component__other-setting__item">修改密码：
                <text class="setting-component__other-setting__item-answer">*******</text>
                <uni-icons type="compose" size="20" @click="popShow = true; settingFormType = 'password';"
                    class="setting-component__other-setting__item-edit"></uni-icons>
            </view>
        </view>
        <view class="setting-component__button">
            <SCButton type="button" size="32rpx" @click="loginOut">退出登录</SCButton>
        </view>
        <pop-wrapper v-model:popShow="popShow">
            <setting-form :type="settingFormType"></setting-form>
        </pop-wrapper>
    </view>
</template>

<script setup lang="ts">


defineOptions({
  options: {
    virtualHost: true,
  },
});import SCButton from "@/components/common/SCButton/index.vue"
import PopWrapper from "@/components/base/PopWrapper/index.vue"
import SettingForm from "./SettingForm.vue";
import { onMounted, ref } from "vue";
import { getUserMeInfo, type UserInfoWithFollow } from "@/api/userApi";

const popShow = ref(false)
const settingFormType = ref<'email' | 'phone' | 'password' | 'avatar'>('email')
const userInfo = ref<UserInfoWithFollow>();
onMounted(async () => {
    // console.log('setting component mounted')
    userInfo.value = await getUserMeInfo()
})

function loginOut() {
    uni.showModal(
        {
            title: '提示',
            content: '是否退出登录？',
            showCancel: true,
            success: async ({ confirm, cancel }) => {
                if (confirm) {
                    await uni.removeStorageSync('token')
                    uni.navigateTo({ url: '/pages/user/login' })
                }
                if (cancel) {
                    return;
                }
            }
        }
    )
}
</script>

<style lang="scss" scoped>
.setting-component {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    box-sizing: border-box;
    height: 100%;

    .setting-component__avatar {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        background-color: $text-muted;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

        &-img {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            border-radius: 50%;
        }
    }

    .setting-component__wallet {
        width: 100%;
        display: flex;
        flex-direction: row;
        padding: 20rpx;
        justify-content: center;
        gap: 40rpx;
        margin-top: 20rpx;

        &__item {
            font-size: 28rpx;
        }
    }

    .setting-component__name {
        margin-top: 10px;
        font-size: 40rpx;
        color: $text-title;
        font-weight: bold;
    }

    .setting-component__other-setting {
        margin-top: 20px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        font-weight: bold;

        .setting-component__other-setting__item {
            margin-top: 10px;
            font-size: 30rpx;
            color: $text-main;
            width: 100%;
            padding: 20rpx 0;
            display: flex;

            &::before {
                content: "";
                width: 5px;
                height: 45rpx;
                background-color: $pink-400;
                margin-right: 25rpx;
                border-radius: 15px;
            }

            &-answer {
                margin-left: 10px;
                color: $text-muted;
                font-weight: 500;
            }

            &-edit {
                margin-left: auto;
            }
        }
    }

    &__button {
        flex: 1;
        display: flex;
        align-items: flex-start;
        margin-top: 100rpx;
    }
}
</style>