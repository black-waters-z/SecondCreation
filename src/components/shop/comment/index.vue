<template>
    <view class="shop-comment">

        <view class="shop-comment__comment">
            <view class="shop-comment__comment--content">
                <img src="/src/static/icon/douhao.svg" alt="description" width="20" height="20"
                    style="margin-right: 10rpx;" />
                {{ commentInfo?.comment?.content || '站位的评论' }}
            </view>
            <view class="shop-comment__comment--interact">
                <click-icon show-text class="shop-comment__comment--interact-click"
                    v-for="(item, idx) in commentInfo?.icons || iconType" :type="item.type ?? item" :num="item?.num"
                    :size="18"></click-icon>
                <view class="shop-comment__user-info">
                    <image :src="commentInfo?.user?.avatar || ''" class="shop-comment__user-info--avatar"></image>
                    <text class="shop-comment__user-info--name">{{ commentInfo?.user?.name || '匿名用户' }}</text>
                    <text class="shop-comment__user-info--time">{{ commentInfo?.comment?.createTime || '1990.1.1'
                    }}</text>
                </view>
            </view>
        </view>
        <view class="shop-comment__product" v-if="show_product">
            <cafe-with-good-nav></cafe-with-good-nav>
        </view>
    </view>
</template>
<script setup lang="ts">
import type { CommentInfo } from './type';
import CafeWithGoodNav from '@/components/shop/CafeWithGoodNav/index.vue';
import ClickIcon from '@/components/base/ClickIcon/index.vue';
const iconType = [["chat"], ["redo-filled"], ["hand-up", "hand-up-filled"]]
defineProps<{ commentInfo: CommentInfo, show_product: boolean }>();
</script>
<style lang="scss" scoped>
.shop-comment {
    box-sizing: border-box;
    margin: 10rpx 20rpx;
    border-radius: 15rpx;
    padding-bottom: 7rpx;

    &__comment {
        padding: 10rpx 20rpx;
        background-color: white;
    }

    &__user-info {
        display: flex;
        flex: 1;
        align-self: center;

        &--avatar {
            width: 40rpx;
            height: 40rpx;
            border-radius: 50%;
            background-color: #ccc;
        }

        &--name {
            margin-left: 10rpx;
            font-size: 25rpx;
            color: $text-main;
            display: flex;
            letter-spacing: 1rpx;
            align-items: center;
            font-style: italic;
        }

        &--time {
            flex: 1;
            display: flex;
            justify-content: flex-end;
            font-size: 23rpx;
            color: $text-muted;
            align-items: center;
            margin-right: 30rpx;
        }
    }

    &__comment {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: 0 20rpx;

        &--content {
            font-size: 26rpx;
            opacity: 0.8;
            letter-spacing: 1rpx;
            box-sizing: border-box;
            padding-top: 20rpx;
            display: -webkit-box;
            -webkit-line-clamp: 6;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: 10rpx;
        }

        &--interact {
            display: flex;
            flex-direction: row-reverse;
            gap: 20rpx;
            margin-top: 20rpx;

            &-click {
                font-size: 24rpx;
            }
        }
    }

    &__product {
        margin-top: 20rpx;
    }
}
</style>