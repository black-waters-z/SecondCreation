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
  <view class="tab-bar-container-02">
    <image :src="`${apiUrl}/static/asset/headBar.png`" mode="aspectFill" class="tab-bar-container-02__image"></image>
    <text class="tab-bar-container-02__text-02">CHUANG</text>
    <text class="tab-bar-container-02__text-01">欢迎来到创作域，请在这里尽情发挥创意！</text>
  </view>
</template>

<script setup lang="ts">
import NavigationBar from "./components/NavigationBar.vue";
const apiUrl = import.meta.env.VITE_API_BASE;
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
      margin-left: 80px;
    }
  }

}

@media screen and (min-width:600px) {
  .tab-bar-container {
    .logo {
      height: 60px;
    }

    .tab-bar-item {
      &__image {
        width: 70px;
        height: 60px;
        margin-left: 80px;
      }
    }
  }

  .tab-bar-container-02 {
    background-color: white;
    width: 100%;
    height: 60px;
    position: relative;

    &__image {
      width: 100%;
      height: 60px;
    }

    &__text-02 {
      position: absolute;
      z-index: 100;
      top: 50%;
      left: 80px;
      color: white;
      font-size: 18px;
      font-weight: 800;
      transform: translateY(-50%);
    }

    &__text-01 {
      position: absolute;
      z-index: 100;
      left: 50%;
      top: 50%;
      letter-spacing: 4rpx;
      text-decoration: 3rpx dashed white underline;
      font-weight: 400;
      transform: translateX(-50%) translateY(-50%);
      font-size: 18px;
      color: white;
    }
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
