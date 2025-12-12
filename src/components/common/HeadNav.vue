<template>
  <!-- #ifdef MP-WEIXIN -->
  <view class="status_bar w-100">
    <view class="status_bar__logo-search" v-if="showSearch">
      <image src="/static/logo.png" mode="scaleToFill" class="logo" />
      <SearchBar
        class="w-100 status_bar__search"
        width="300rpx"
        height="75rpx"
      ></SearchBar>
    </view>
  </view>
  <!-- #endif -->
</template>

<script setup lang="ts">
import SearchBar from "./SearchBar.vue";
defineOptions({
  options: {
    styleIsolation: "shared", // 或者 "shared"
  },
});

defineProps<{ showSearch: boolean }>();
</script>

<style lang="scss">
.status_bar {
  width: 100vw;
  z-index: 1000;
  position: fixed;
  top: 0;
  min-height: 80rpx;
  background: white;
  left: 0;

  &__logo-search {
    display: flex;
    align-items: center;
    padding: 0 20rpx;
    margin-top: 70rpx;

    .logo {
      width: 81.3px;
      height: 29.7px;
      margin-left: 20rpx;
    }
  }
}

.search-bar-container {
  justify-content: flex-start !important;
}

.search-bar-container .search-container {
  margin-left: 40rpx !important;
}
</style>
