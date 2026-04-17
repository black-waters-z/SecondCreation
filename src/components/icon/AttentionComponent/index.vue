<template>
    <view class="attention-component">
        <article-author class="attention-component__author" v-for="(item, idx) in userInfos" :key="idx"
            :user-info="item" has_attention></article-author>
    </view>
</template>

<script setup lang="ts">


defineOptions({
  options: {
    virtualHost: true,
  },
});import ArticleAuthor from "@/pages/article/components/ArticleAuthor.vue";
import { type UserInfo } from "@/pages/user/type";
import { onMounted, ref } from "vue";
import { getUserFollows } from "@/api/userApi";
const userInfos = ref<UserInfo[]>();
onMounted(async () => {
    userInfos.value = await getUserFollows(1)
})
</script>

<style lang="scss" scoped>
.attention-component {
    display: flex;
    flex-direction: column;
    padding: 20px;
    box-sizing: border-box;

    .attention-component__author {
        width: 100%;
        border-bottom: 1rpx dashed $border-color;
    }
}
</style>