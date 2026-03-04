<template>
  <view class="go-back-container w-full" :style="{ boxShadow: hasShadow ? '0 0 10px rgba(0, 0, 0, 0.1)' : undefined }">
    <go-back-icon></go-back-icon>
    <text class="go-back-container__return-text">
      <slot></slot>
    </text>
    <view class="go-back-container__right">
      <slot name="right" style="width:100%"></slot>
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
import { ref } from 'vue';
import SearchBar from './SearchBar.vue';
import SelectCollection from '@/pages/post/components/SelectCollection.vue';
import GoBackIcon from '@/components/base/GoBackIcon/index.vue';
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
    justify-content: flex-end;
    box-sizing: border-box;
    margin: 10rpx 0;
    min-width: 0;
    overflow-x: auto;

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

@media screen and (min-width: 600px) {
  .go-back-container {
    background: none;
    box-sizing: border-box;
    padding: 10px 100px;
  }
}
</style>
