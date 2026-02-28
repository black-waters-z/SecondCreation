<template>
    <view class="setting-form">
        <change-email v-if="type === 'email'" v-model="changeUser" @submit="submit"></change-email>
        <change-password v-if="type === 'password'" v-model="changeUser" @submit="submit"></change-password>
        <change-phone v-if="type === 'phone'" v-model="changeUser" @submit="submit"></change-phone>
        <change-avatar v-if="type === 'avatar'" v-model="changeUser" @submit="submit"></change-avatar>
    </view>
</template>

<script setup lang="ts">
import ChangeEmail from '@/components/form/ChangeEmail.vue';
import ChangePassword from '@/components/form/ChangePassword.vue';
import ChangePhone from '@/components/form/ChangePhone.vue';
import ChangeAvatar from '@/components/form/ChangeAvatar.vue';
import { type UserChange } from './type';
import { ref } from 'vue';
import { changeUserFunc } from '@/api/userApi';
defineProps<{ type: string }>();
const changeUser = ref<UserChange>({
    username: null,
    email: null,
    old_password: null,
    password_hash: null,
    avatar_url: null,
    bio: null,
    is_active: null
});
// 在外层进行访问用户更改的api

async function submit() {
    console.log(changeUser.value);
    const result = await changeUserFunc(changeUser.value)
    uni.showToast({
        title: result.message || '',
        icon: 'success'
    });
}
</script>

<style lang="scss" scoped>
.setting-form {
    box-sizing: border-box;
    padding: 10rpx;
}
</style>