<template>
    <view class="article-author">
        <navigator :url="`/pages/user/info?id=${userInfo?.id}`" open-type="navigate">
            <image class="article-author__avatar" :src="userInfo?.avatar_url" mode="aspectFill"></image>
        </navigator>
        <text class="article-author__name">{{ userInfo?.username }}</text>
        <SCButton class="article-author__bt" type="button" size="25rpx" @click="toggleAttentionFunc(userInfo.id)"
            v-if="!isMe" color="white" :bgcolor="has_attentioned ? 'grey' : 'red'">
            {{ has_attentioned ? '已关注' : '关注' }}</SCButton>
    </view>
</template>

<script setup lang="ts">
import type { UserInfo } from '@/pages/user/type';
import SCButton from '@/components/common/SCButton/index.vue';
import { ref } from 'vue';
import { watch } from 'vue';
import { toggleAttention } from "@/api/userApi"

const props = defineProps<{ userInfo: UserInfo, has_attention?: boolean }>()

const has_attentioned = ref(props.has_attention)
watch(() => props.has_attention, (newValue) => {
    has_attentioned.value = newValue
}, { immediate: true })

async function toggleAttentionFunc(following_id: number) {
    has_attentioned.value = !has_attentioned.value
    // 接入接口
    await toggleAttention(following_id)
}



</script>

<style lang="scss" scoped>
.article-author {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 20rpx 0;

    .article-author__avatar {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
        background-color: #f5f5f5;
        box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.733);
    }

    .article-author__name {
        margin-left: 20rpx;
        font-size: 30rpx;
        color: #333;
        font-weight: 600;
        font-style: italic;
    }

    &__bt {
        margin-left: auto;
    }
}
</style>
