<template>
    <view class="ai-setting">
        <view class="ai-setting__title">AI设置</view>
        <FormBase v-model:source="settings[idx]" v-for="(item, idx) in settings" :key="idx"></FormBase>
        <SCButton class="ai-setting__button" type="button" size="26rpx" color="green" @click="submit">保存设置</SCButton>
    </view>
</template>

<script setup lang="ts">


defineOptions({
  options: {
    virtualHost: true,
  },
});import { ref } from 'vue';
import SCButton from "@/components/common/SCButton/index.vue"
import FormBase from "@/components/form/base/index.vue"
import type { FormBaseType } from '@/components/form/base/type';

const settings = ref<FormBaseType[]>([
    { name: '角色名称', value: '', type: 'text', placeholder: '请输入角色名称' },
    { name: '角色描述', value: '', type: 'text', placeholder: '角色描述，ip + 角色名' },
    { name: '角色头像（上传）', value: '', type: 'file', placeholder: '自定义角色gif' },
])

interface Role {
    roleName: string;
    roleDesc: string;
    roleAvatar: string;
}

function submit() {
    // console.log(settings.value)
    // 这里加入接口
    const role: Role = {
        roleName: settings.value[0].value,
        roleDesc: settings.value[1].value,
        roleAvatar: settings.value[2].value,
    }
    // 保存成功弹出
    uni.showToast({
        title: '保存成功，刷新页面即可显示',
        icon: 'success',
        duration: 2000,
    });
}
</script>

<style lang="scss" scoped>
.ai-setting {
    padding: 20rpx 40rpx;

    &__button {
        margin: 0 auto;
        margin-top: 20rpx;
    }
}
</style>