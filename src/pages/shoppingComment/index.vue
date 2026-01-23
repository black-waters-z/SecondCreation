<template>
    <PageWrapper class="shopping-comment" show-head>
        <template #scroll>
            <view class="w-full shopping-comment__go-back">
                <go-back-icon></go-back-icon>
            </view>
            <Comment class="shopping-comment__parent-comment" :comment-info="parentComment" show_product></Comment>
            <post-comment @send-comment="sendComment"></post-comment>
            <Comment class="shopping-comment__child-comment" type="child" v-for="(value, idx) in shopComment" :key="idx"
                :comment-info="value"></Comment>
        </template>
    </PageWrapper>
</template>

<script setup lang="ts">
import PageWrapper from '@/components/container/PageContainer.vue';
import { onLoad } from '@dcloudio/uni-app';
import Comment from '@/components/shop/comment/index.vue';
import GoBackIcon from '@/components/base/GoBackIcon/index.vue';
import PostComment from '../article/components/PostComment.vue';
import type { CommentInfo } from '@/components/shop/comment/type';
import { ref } from 'vue';
import { getCommentsByCommentId } from '@/api/shopApi';
const parentComment = ref<CommentInfo>();
const shopComment = ref<CommentInfo[]>();
onLoad(async (options) => {
    getCommentsByCommentId(options?.comment_id).then((res) => {
        parentComment.value = res?.comment;
        shopComment.value = res?.replies.items;
    })
})

function sendComment(comment: string) {
    if (!comment) return;
    console.log(comment);
    // 上接口，返回格式为CommentInfo的数据
    // 添加到shopComment中
    shopComment.value?.concat(shopComment.value)
}
</script>

<style lang="scss">
page {
    height: 100vh;
}

.shopping-comment {

    &__parent-comment {
        .icon-wrapper.shop-comment__comment--interact-click:first-child {
            display: none;
        }
    }

    &__go-back {
        height: 100rpx;
        display: flex;
        align-items: center;
        padding: 20rpx;
        padding-bottom: 0rpx;
        box-sizing: border-box;
    }
}
</style>