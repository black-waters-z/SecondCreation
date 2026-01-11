<template>
  <view class="w-full">
    <go-back type="search" @search="search" :collection-list="collectionList"></go-back>
  </view>
</template>

<script setup lang="ts">
import GoBack from '@/components/common/GoBack.vue';
import { ref } from 'vue';
function search(searchText: string) {
  console.log('search', searchText);
  //   这里插入查询的接口
}

const collectionList = ref([
  { id: 1, name: '同人文' },
  { id: 2, name: '同人图' },
]);
</script>

<style lang="scss">
.go-back-container__search {
  .search-input-container__input {
    width: 500rpx !important;
    height: 55rpx !important;
  }
}
</style>
