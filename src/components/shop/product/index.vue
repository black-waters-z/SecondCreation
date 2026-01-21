<template>
    <view class="shop-product">
        <image :src="goodInfo?.good_img ?? '#'" mode="scaleToFill" class="shop-product--img" />
        <view class="shop-product--info">
            <navigator :url="`/pages/buyGood/index?id=${goodInfo?.id ?? 0}`" open-type="navigate"
                hover-class="navigator-hover">
                <text class="shop-product--info-title">
                    {{ goodInfo?.title ?? "【白正】AAA批发市场AAA批发市场AAA" }}
                </text>
            </navigator>

            <view class="shop-product--info-owner">
                <image class="shop-product--info-owner__avatar" :src="goodInfo?.store?.avatar ?? ''"> </image>
                <text class="shop-product--info-owner__name">{{ goodInfo?.store?.name ?? 'aaa批发市场' }}</text>
                <click-icon class="shop-product--info-owner__star" :type="type" :size="23"></click-icon>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import ClickIcon from '@/components/base/ClickIcon/index.vue'
import type { goodInfoType } from './type'
const type = ['star', 'star-filled']

defineProps<{
    goodInfo: goodInfoType
}>()
</script>

<style lang="scss" scoped>
.shop-product {
    background-color: white;
    width: 340rpx;
    border-radius: 16rpx;

    &--img {
        width: 100%;
        height: 200rpx;
        background-color: $border-color;
        border-radius: 16rpx;
    }

    &--info {
        padding: 0 16rpx;
        display: block;
        width: 100%;
        box-sizing: border-box;

        &-title {
            width: 100%;
            display: block;
            font-size: 28rpx;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        &-owner {
            display: flex;
            align-items: center;
            gap: 10rpx;

            &__avatar {
                width: 40rpx;
                height: 40rpx;
                background-color: $border-color;
                border-radius: 50%;
            }

            &__name {
                font-size: 24rpx;
                font-style: italic;
                font-weight: 400;
                color: $text-muted;
            }

            &__star {
                flex: 1;
                display: flex;
                justify-content: flex-end;
            }
        }
    }
}
</style>