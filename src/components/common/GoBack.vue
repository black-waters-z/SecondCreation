<template>
  <view class="go-back-container w-full">
    <uni-icons type="left" size="20" @click="goBack"></uni-icons>
    <view class="go-back-container__title">{{ title }}</view>
    <select-collection class="justify-center" v-if="type" v-model="index" :collection-list="collectionList">
      <template #filterEnd><up-icon size="12" name="arrow-down" bold></up-icon> </template>
    </select-collection>
    <search-bar class="go-back-container__search" v-if="type" :type="type" @search="onSearchFromChild"></search-bar>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SearchBar from './SearchBar.vue';
import SelectCollection from '@/pages/post/components/SelectCollection.vue';
interface collection {
  id: number;
  name: string;
}

const index = ref(0);

function goBack() {
  uni.navigateBack();
}
const emit = defineEmits(['search']);

const onSearchFromChild = (text: string) => {
  emit('search', text, props.collectionList[index.value]);
};

const props = withDefaults(defineProps<{ title?: string; type?: string; collectionList: collection[] }>(), {
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
