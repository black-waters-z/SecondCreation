<template>
    <view class="user-info-articles">
        <UserInfoArticle v-for="(item, idx) in articleList" :key="idx" :article="item" :user="userInfo">
        </UserInfoArticle>
    </view>
</template>

<script setup lang="ts">


defineOptions({
  options: {
    virtualHost: true,
  },
});import UserInfoArticle from '../Article/UserInfoArticle.vue';
import type { ManageArticle } from '@/components/icon/ArticleManagerComponent/type';
import type { UserInfo } from '@/pages/user/type';

defineProps<{
    articleList: ManageArticle[];
    userInfo: UserInfo;
}>();

// function goToHome() {
//     uni.switchTab({
//         url: '/pages/index/index'
//     });
// }
</script>

<style lang="scss" scoped>
.user-info-articles {

    .user-info-articles__icon {
        padding: 0 20rpx;
    }
}

@media screen and (min-width:600px) {
    .user-info-articles {
        margin-top: 20rpx;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 20rpx;
    }
}
</style>