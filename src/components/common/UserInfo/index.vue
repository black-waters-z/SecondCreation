<template>
    <view class="user-info-component">
        <image class="user-info-component__avatar" :src="userInfo?.avatar_url" mode="aspectFill"></image>
        <view class="user-info-component__name">{{ userInfo?.username }}</view>
        <SCButton class="article-author__bt" type="button" size="25rpx" @click="toggleAttentionFunc(userInfo.id)"
            v-if="!isMe" :color="has_attentioned ? 'grey' : 'red'">
            {{ has_attentioned ? '已关注' : '关注' }}</SCButton>
        <view class="user-info-component__info">
            <view class="user-info-component__info__item">
                关注</view>
            <view class="user-info-component__info__item">粉丝</view>
        </view>
    </view>
</template>

<script setup lang="ts">
import SCButton from '@/components/common/SCButton/index.vue';
import { ref, watch } from 'vue';
import { toggleAttention, type UserInfoWithFollow } from '@/api/userApi';
const props = defineProps<{
    userInfo: UserInfoWithFollow;
    isMe: boolean
}>();

const has_attentioned = ref(props.userInfo?.following)
watch(() => props.userInfo?.following, (newValue) => {
    has_attentioned.value = newValue
}, { immediate: true })

async function toggleAttentionFunc(following_id: number) {
    has_attentioned.value = !has_attentioned.value
    // 接入接口
    await toggleAttention(following_id)
}

</script>

<style lang="scss" scoped>
.user-info-component {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: $border-color;
    box-sizing: border-box;
    padding: 20rpx;

    &__avatar {
        width: 130rpx;
        height: 130rpx;
        border-radius: 50%;
        background-color: $border-color;
        margin-top: 40rpx;
    }

    &__name {
        font-size: 40rpx;
        font-weight: 600;
        color: $text-main;

    }

    &__info {
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin-top: 40rpx;

        &__item {
            font-size: 30rpx;
            color: white;
            text-shadow: 0 0 10rpx rgba(0, 0, 0, 0.259);
        }
    }
}

@media screen and (min-width:600px) {
    .user-info-component {
        width: calc(100% - 200px);
        box-sizing: border-box;
        margin: 0 100px;
    }
}
</style>