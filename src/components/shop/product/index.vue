<template>
    <navigator :url="`/pages/buyGood/index?id=${goodInfo?.id ?? 0}`" open-type="navigate" hover-class="navigator-hover"
        class="shop-product">
        <image :src="goodInfo?.goodImg ?? '#'" mode="aspectFill" class="shop-product--img" />
        <view class="shop-product--info">

            <text class="shop-product--info-title">
                {{ goodInfo?.title ?? "【白正】AAA批发市场AAA批发市场AAA" }}
            </text>

            <view class="shop-product--info-owner" @click.stop="">
                <image class="shop-product--info-owner__avatar" :src="goodInfo?.store?.avatar ?? ''"> </image>
                <text class="shop-product--info-owner__name">{{ goodInfo?.store?.name ?? 'aaa批发市场' }}</text>
                <click-icon class="shop-product--info-owner__star" :type="type" :size="23"></click-icon>
            </view>
        </view>
    </navigator>

</template>

<script setup lang="ts">
import ClickIcon from '@/components/base/ClickIcon/index.vue'
import type { goodInfoType } from './type'
const type = ['star', 'star-filled']

defineProps<{
    goodInfo: goodInfoType
}>()

defineOptions({
  options: {
    virtualHost: true,
  },
});
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

@media screen and (min-width:600px) {
    .shop-product {
        box-sizing: border-box;
        margin: 0 auto;
        width: 100%;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        box-shadow: $grey-shadow-01;
        border: 10rpx solid white;

        &--img {
            height: 400rpx;
        }

        &:hover {
            box-shadow: $grey-shadow-02;
        }
    }
}
</style>