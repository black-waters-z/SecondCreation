<template>
  <view class="navigation-bar-containers">
    <view
      v-for="(item, key) in navigationOptions"
      :key="key"
      :class="
        activeTabBarIndex === key
          ? 'navigation-bar-container active'
          : 'navigation-bar-container'
      "
      @click="goToPath(item.path, key)"
    >
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
  uni.switchTab({
    url: path,
  });
}
</script>

<style scoped lang="scss">
.navigation-bar-containers {
  display: flex;
  gap: 10rpx;
  margin-right: 30px;
  height: 100%;
  align-items: center;
  cursor: pointer;
  .navigation-bar-container {
    height: 60%;
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    border-radius: 30px;

    &:hover {
      background-color: #f3f4f6;
    }
  }
}

.active {
  color: $pink-color;
  background-color: #f3f4f6;
}
</style>
