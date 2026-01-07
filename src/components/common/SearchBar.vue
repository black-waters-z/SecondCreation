<template>
  <view class="search-bar-container">
    <view class="search-container" v-if="type === 'default'" :style="{ width: width, height: height }">
      <uni-icons fontFamily="CustomFont" color="white" size="15" class="search-container__icon">{{ '&#xe60d;' }} </uni-icons>
    </view>
    <view class="search-input-container" v-if="type === 'search'" :style="{ width: width, height: height }">
      <input class="search-input-container__input" v-model="searchText" type="text" placeholder="请输入搜索内容" />
      <uni-icons type="search" size="30" class="icon search-input-container__icon" @click="$emit('search', searchText)" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
withDefaults(
  defineProps<{
    height: string;
    width: string;
    type?: string;
  }>(),
  {
    type: 'default',
  },
);

const searchText = ref<string>('');

defineEmits(['search']);
</script>

<style scoped lang="scss">
@font-face {
  font-family: CustomFont;
  src: url('../../static/iconfont.ttf');
}

$icon-grey: #707070;

.search-bar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;

  // #ifdef H5
  position: sticky;
  top: 0;
  // #endif

  .search-input-container {
    display: flex;
    align-items: center;

    &__input {
      // #ifdef MP-WEIXIN
      width: 200rpx;
      // #endif
      width: 500rpx !important;
      height: 55rpx !important;
      padding-left: 10rpx;
      padding-right: 10rpx;
      border: 3px solid $text-main;
      border-radius: 1000px;
    }

    &__icon {
      margin-left: 10rpx;
    }
  }

  .search-container {
    width: 300px;
    height: 40px;
    background-color: #707070;
    opacity: 0.2;
    border-radius: 1000px;
    color: white;
    text-align: center;
    margin: 5rpx 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;

    uni-text {
      margin-left: 30px;
    }
  }
}

@media screen and (max-width: 600px) {
  .search-bar-container {
    .search-container {
      &__icon {
        margin-left: 30rpx;
      }
    }
  }
}
</style>
