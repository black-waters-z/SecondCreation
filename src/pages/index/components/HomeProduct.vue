<template>
  <view class="w-100 relative">
    <Arrow class="scroll-view-container__left-arrow" @click="goToLeft" v-show="!stopScrollLeft"></Arrow>
    <Arrow class="scroll-view-container__right-arrow" @click="goToRight" v-show="!stopScrollRight"></Arrow>
    <scroll-view ref="scrollView" :scroll-left="scrollLeft" scroll-x="true" scroll-with-animation
      class="w-100 scroll-view-container" @scrolltoupper="scrollLeftStop" @scrolltolower="scrollRightStop"
      @scroll.passive="onScroll($event)">
      <Product :good-info="value" v-for="(value, idx) in source || [1, 2, 3, 4, 5]"
        class="scroll-view-container__product" :key="idx"></Product>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
// import Product from '@/components/common/Product/index.vue';
import Product from "@/components/shop/product/index.vue"
import Arrow from '@/components/common/Arrow/index.vue';
import { useProductSwiper } from '@/hooks/useProductSwiper';
import { ref } from 'vue';
import type { goodInfo } from '@/pages/shopping/type';

// 包个点击按钮然后移动多少距离的hook出来

const { goToRight, goToLeft, scrollLeft, scrollRightStop, scrollLeftStop, stopScrollRight, stopScrollLeft, onScroll } = useProductSwiper();
const scrollView = ref(null);

defineProps<{ source: goodInfo[] }>();
</script>

<style lang="scss" scoped>
.scroll-view-container {
  width: 100%;
  white-space: nowrap;

  margin: {
    top: 20rpx;
    bottom: 10rpx;
  }


  &__left-arrow {
    position: absolute;
    left: 10rpx;
    top: 50%;
    transform: translateY(-50%);
    z-index: 20;
  }

  &__right-arrow {
    position: absolute;
    right: 10rpx;
    top: 50%;
    transform: translateY(-50%) scaleX(-1);
    z-index: 20;
  }

  &__product {
    display: inline-block;
    margin-right: 8rpx;
    margin-left: 18rpx;
    white-space: normal;
    box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);

    &:first-child {
      margin-left: 20rpx;
    }
  }
}
</style>
