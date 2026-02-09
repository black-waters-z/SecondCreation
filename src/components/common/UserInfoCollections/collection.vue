<template>
    <navigator class="user-info--collection" :url="`/pages/user/collectionArticles?collection_id=${collection?.id}`"
        open-type="navigate">
        <view class="user-info--collection-image">
            <uni-icons type="paperclip" size="30" color="#ffffffde"></uni-icons>
            <image v-if="collection?.image_url" :src="collection?.image_url" mode="aspectFill"></image>
        </view>
        <view class="w-full user-info--collection__info">
            <view class="user-info--collection-title">{{ collection?.name }}</view>
            <view class="user-info--collection-description">{{ collection?.description }}</view>
        </view>
    </navigator>
</template>

<script setup lang="ts">
import type { CollectionData } from './type';
defineProps<{ collection: CollectionData }>();


</script>

<style lang="scss" scoped>
.user-info--collection {
    width: 100%;
    display: flex;
    box-sizing: border-box;
    padding: 10rpx 20rpx;
    border-bottom: 1rpx dashed $border-color;

    ::v-deep .navigator-wrap {
        width: 100%;
        display: flex;
    }

    &-image {
        width: 180rpx;
        height: 180rpx;
        background-color: $text-muted;
        border-radius: 15rpx;
        padding: 10rpx;
        box-sizing: border-box;
    }

    &__info {
        flex: 1;
        margin-left: 20rpx;
        box-sizing: border-box;
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
</style>