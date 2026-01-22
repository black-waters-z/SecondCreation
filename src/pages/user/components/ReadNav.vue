<template>
  <view class="read-nav-container">
    <view v-for="(item, idx) in navItems" :key="item.label" class="read-nav-container__icon"
      :class="{ 'icon_active': activeIndex === idx }" @click="goToIconNavigatePage(item?.type, item?.label, idx)">
      <uni-icons fontFamily="CustomFont" :color="color || 'grey'" size="25">
        {{ item.icon }}
      </uni-icons>
      <text class="icon-text" :style="{ color: 'grey' }"> {{ item.label }} </text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { isMobile } from '@/utils';
import { ref } from 'vue';
interface NavItems {
  icon: string;
  label: string;
  type?: string;
}
defineProps<{ navItems: NavItems[]; color?: string }>();
const activeIndex = ref(0);
const goToIconNavigatePage = (componentType: string | undefined, goBackTitle: string | number | boolean, idx: number) => {
  activeIndex.value = idx;
  if (isMobile) {
    uni.navigateTo({
      url: `/pages/iconNavigate/index?icon=${componentType}&goBackTitle=${encodeURIComponent(goBackTitle)}`,
    });
    return;
  }
  // 向iframe传url
};
</script>

<style scoped lang="scss">
@font-face {
  font-family: CustomFont;
  src: url('../../../static/iconfont.ttf');
}

.icon_active {
  background-color: $border-color;
}

.read-nav-container {
  width: 100%;
  border-radius: 16rpx;
  height: 150rpx;
  background-color: white;
  display: flex;
  align-items: center;
  box-sizing: border-box;

  &__icon {
    flex: 1;
    display: flex;
    height: 100rpx;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;

    .icon-text {
      margin-top: 10rpx;
      font-size: 23rpx;
    }
  }
}
</style>
