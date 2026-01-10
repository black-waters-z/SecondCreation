<template>
  <view class="go-back-container w-full">
    <uni-icons type="left" size="20" @click="goBack"></uni-icons>
    <view class="go-back-container__title">{{ title }}</view>
    <search-bar class="go-back-container__search" v-if="type" :type="type" @search="onSearchFromChild"></search-bar>
  </view>
</template>

<script setup lang="ts">
import SearchBar from './SearchBar.vue';
function goBack() {
  uni.navigateBack();
}
const emit = defineEmits(['search']);

const onSearchFromChild = (text: string) => {
  emit('search', text);
};

withDefaults(defineProps<{ title?: string; type?: string }>(), {
  title: '',
});
</script>

<style scoped lang="scss">
.go-back-container {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 20rpx;
  background-color: white;
  left: 0;
  min-height: 80rpx;

  &__search {
    flex: 1;
  }

  &__title {
    position: absolute;
    margin-left: 50%;
    transform: translateX(-50%);
    font-size: 24rpx;
    font-weight: 700;
  }
}

@media screen and (min-width: 600px) {
  .go-back-container {
    display: none;
  }
}
</style>
