<template>
  <view class="tab-bar-container">
    <view class="tab-bar-container__navigation">
      <navigation-bar :navigation-options="navigationOptions"></navigation-bar>
    </view>
    <view class="logo">
      <navigator url="/pages/index/index" open-type="switchTab" hover-class="navigator-hover" class="tab-bar-item">
        <image src="/src/static/logo.png" class="tab-bar-item__image" mode="aspectFit"></image>
      </navigator>
    </view>
  </view>
</template>

<script setup lang="ts">
import NavigationBar from "./components/NavigationBar.vue";

const navigationOptions = [
  { title: "标签", path: "/pages/tagNav/index" },
  { title: "合集", path: "/pages/hotCollection/index" },
  { title: "公告", path: "/pages/notice/index" },
  { title: "搜索", path: "/pages/search/index" },
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
      height: 44px;
      margin-left: 30px;
    }
  }

}
</style>
