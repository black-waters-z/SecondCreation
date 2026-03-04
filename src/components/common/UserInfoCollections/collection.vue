<template>
    <navigator class="user-info--collection__container"
        :url="`/pages/user/collectionArticles?collection_id=${collection?.id}`" open-type="navigate">
        <view v-if="collection?.author_username" class="user-info--collection-author">
            <image class="user-info--collection-author__avatar"
                :src="collection?.author_avatar_url ? collection?.author_avatar_url : '/static/images/avatar.png'"
                mode="aspectFill"></image>
            <view class="user-info--collection-author__name">
                <text>{{ collection?.author_username }}</text>
            </view>
            <image v-if="price" :src="`/static/common/${price}.png`" mode="aspectFill"
                style="width: 50rpx;height: 50rpx;margin-left: auto;" class="user-info--collection-author__price">
            </image>
        </view>
        <view class="user-info--collection">
            <view class="user-info--collection-image">
                <uni-icons type="paperclip" size="30" color="#ffffffde"
                    class="user-info--collection-image__icon"></uni-icons>
                <image class="user-info--collection-image__url" v-if="collection?.image_url"
                    :src="collection?.image_url" mode="aspectFill"></image>
            </view>
            <view class="w-full user-info--collection__info">
                <view class="user-info--collection-title">{{ collection?.name }}</view>
                <view class="user-info--collection-description">{{ collection?.description }}</view>

            </view>
        </view>
    </navigator>

</template>

<script setup lang="ts">
import type { CollectionData } from './type';
defineProps<{ collection: CollectionData, price: string, number: number }>();


</script>

<style lang="scss" scoped>
.user-info--collection {
    width: 100%;
    display: flex;
    box-sizing: border-box;
    padding: 10rpx 20rpx;
    border-bottom: 1rpx dashed $border-color;

    &-author {
        width: 100%;
        box-sizing: border-box;
        padding: 5rpx 20rpx;
        display: flex;
        align-items: center;
        margin-top: 10rpx;


        &__avatar {
            width: 50rpx;
            height: 50rpx;
            border-radius: 50%;
        }

        &__name {
            margin-left: 10rpx;
            font-size: 26rpx;
        }
    }

    ::v-deep .navigator-wrap {
        width: 100%;
        display: flex;
    }

    &-image {
        width: 180rpx;
        height: 180rpx;
        background-color: $text-muted;
        border-radius: 15rpx;
        box-sizing: border-box;
        position: relative;

        &__icon {
            position: absolute;
            z-index: 200;
            text-shadow: 0 0 10rpx rgba(0, 0, 0, 0.5);
            left: 5rpx;
            top: 10rpx;
        }

        &__url {
            width: 100%;
            position: absolute;
            height: 100%;
            border-radius: 15rpx;
        }
    }

    &__info {
        flex: 1;
        margin-left: 20rpx;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
    }

    &-title {
        font-size: 32rpx;
    }

    &-description {
        color: $text-muted;
        font-size: 26rpx;
        margin-top: 10rpx;
    }
}

@media screen and (min-width:600px) {
    .user-info--collection {
        background-color: white;
        border-radius: 20px;
        box-shadow: $grey-shadow-01;
    }

}
</style>