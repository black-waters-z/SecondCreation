<template>
  <view class="go-back-container w-full"
    :style="{ 'box-shadow': hasShadow && isMobile ? '0 0 10rpx rgba(0, 0, 0, 0.1)' : undefined }">
    <go-back-icon></go-back-icon>
    <text class="go-back-container__return-text">
      <slot></slot>
    </text>
    <view class="go-back-container__right">
      <slot name="right"></slot>
      <!-- 这里是搜索的框 -->
    </view>
    <view class="go-back-next">
      <slot name="right-no-scroll"></slot>
      <!-- 这里是搜索的框 -->
    </view>
    <uni-icons type="cart-filled" class="cart-filled" size="20" v-if="showCart"></uni-icons>
    <view class="go-back-container__title">{{ title }}</view>
    <navigator v-if="showLogo" class="go-back-container__logo" url="/pages/index/index" open-type="switchTab">
      <image src="/src/static/logo.png" mode="scaleToFill" class="go-back-container__logo-img" />
    </navigator>
  </view>
</template>

<script setup lang="ts">


defineOptions({
  options: {
    virtualHost: true,
  },
});import { ref } from 'vue';
import GoBackIcon from '@/components/base/GoBackIcon/index.vue';
import { isMobile } from '@/utils';
interface collection {
  id: number;
  name: string;
}

const index = ref(0);

const emit = defineEmits(['search']);

const onSearchFromChild = (text: string) => {
  emit('search', text, props?.collectionList?.[index.value]);
};

const props = withDefaults(defineProps<{ title?: string; type?: string; collectionList?: collection[]; showCart?: boolean; showLogo?: boolean; hasShadow?: boolean }>(), {
  title: '',
});
</script>

<style scoped lang="scss">
:deep(.select-collection-container) {
  background-color: white;
  padding: 0;
}

:deep(.select-collection-container__picker__text) {
  font-size: 20rpx;
}

.go-back-container {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 10rpx;
  background-color: white;
  left: 0;
  min-height: 80rpx;

  &__right {
    box-sizing: border-box;
    margin: 10rpx 0;
    min-width: 0;
    overflow-x: auto;
    display: flex;
  }

  &__logo {
    width: 130rpx;
    height: 50rpx;
    margin-left: auto;
    margin-right: 20rpx;

    &-img {
      width: 100%;
      height: 100%;
    }
  }

  &__return-text {
    letter-spacing: 4rpx;
    font-size: 29rpx;
    margin-left: 20rpx;
    font-weight: 500;
  }

  &__search {
    flex: 1;
    margin-left: 10rpx;
  }

  &__title {
    position: absolute;
    margin-left: 50%;
    transform: translateX(-50%);
    font-size: 24rpx;
    font-weight: 700;
  }
}

.cart-filled {
  position: absolute;
  right: 20rpx;
}

.go-back-next {
  flex: 1;
  display: flex;
  justify-content: center;
}

@media screen and (min-width: 600px) {
  .go-back-container {
    background: none;
    box-sizing: border-box;
    padding: 10px 100px;
    box-shadow: none;
  }
}
</style>
