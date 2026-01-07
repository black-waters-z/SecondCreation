<template>
  <view class="w-full">
    <go-back type="search" @search="search"></go-back>
  </view>
</template>

<script setup lang="ts">
import GoBack from '@/components/common/GoBack.vue';
function search(searchText: string) {
  console.log('search', searchText);
  //   这里插入查询的接口
}
</script>

<style lang="scss">
.go-back-container__search {
  .search-input-container__input {
    width: 500rpx !important;
    height: 55rpx !important;
  }
}
</style>
