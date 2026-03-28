<template>
  <view class="navigation-bar-containers">
    <view v-for="(item, key) in navigationOptions" :key="key" :class="activeTabBarIndex === key
      ? 'navigation-bar-container active'
      : 'navigation-bar-container'
      " @click="goToPath(item.path, key)">
      <view class="navigation-bar-container__title">
        <text>
          {{ item.title }}
        </text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useTabBarStore } from "@/store/useNav";
import { storeToRefs } from "pinia";
interface TabBarNavigation {
  title: string;
  path: string;
}
const { activeTabBarIndex } = storeToRefs(useTabBarStore());
const { changeTabBarIndex } = useTabBarStore();
defineProps<{
  navigationOptions: TabBarNavigation[];
}>();

function goToPath(path: string, index: number) {
  changeTabBarIndex(index);
  uni.navigateTo({
    url: path,
  });
}
</script>

<style scoped lang="scss">
.navigation-bar-containers {
  display: flex;
  height: 100%;
  align-items: center;
  cursor: pointer;
  padding-right: 50px;
  padding-left: 100px;

  .navigation-bar-container {
    height: 100%;
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 540;
    letter-spacing: 3rpx;
    text-decoration: 1px dashed $pink-400 underline;
    padding: 0 0px;
    display: flex;
    align-items: center;
    font-size: 16px;

    &:hover {
      // background-color: $pink-200;
      // color: $pink-300;
      font-weight: 550;
      color: $text-muted;
    }
  }
}

.active {
  color: $pink-400;
  transform: translateX(0);
}
</style>
