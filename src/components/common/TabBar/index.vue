<template>
  <view class="tab-bar-container">
    <view class="tab-bar-container__navigation">
      <navigation-bar :navigation-options="navigationOptions"></navigation-bar>
    </view>
    <view class="tab-bar-container__search">
      <search-bar></search-bar>
    </view>
    <view class="logo">
      <view class="tab-bar-item">
        <image
          src="/static/logo.png"
          class="tab-bar-item__image"
          mode="aspectFit"
        ></image>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import SearchBar from "../SearchBar.vue";
import NavigationBar from "./components/NavigationBar.vue";

const navigationOptions = [
  { title: "首页", path: "/" },
  { title: "粮仓", path: "/pages/store/index" },
  { title: "消息", path: "/pages/more/index" },
  { title: "我的", path: "/pages/user/index" },
];
</script>

<style lang="scss" scoped>
.tab-bar-container {
  display: flex;
  flex-direction: row-reverse;

  .logo {
    flex: 1;
    display: flex;
  }
  .tab-bar-item {
    &__image {
      width: 70px;
      height: 70px;
      margin-left: 50px;
    }
  }

  &__search {
    flex: 1;
    display: flex;
  }
}
</style>
