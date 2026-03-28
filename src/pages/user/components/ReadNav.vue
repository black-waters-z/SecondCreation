<template>
  <view class="read-nav-container">
    <view class="read-nav-container__icon-background" v-if="!isMobile"
      :style="{ transform: `translateY(${150 * activeIndex}rpx)` }">
    </view>
    <view v-for="(item, idx) in navItems" :key="item.label" class="read-nav-container__icon"
      :class="{ 'icon_active': activeIndex === idx }" @click="goToIconNavigatePage(item?.type, item?.label, idx)">
      <uni-icons v-if="!item.iconPath" fontFamily="CustomFont" :color="color ?? 'grey'" size="21"
        class="read-nav-container__icon-icon">
        {{ item.icon }}
      </uni-icons>
      <image v-else :src="item.iconPath" mode="aspectFit" class="read-nav-container__icon-image"></image>
      <text class="icon-text" :style="{ color: 'black' }"> {{ item.label }} </text>
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
  iconPath?: string;
}
defineProps<{ navItems: NavItems[]; color?: string; iconIndx?: number }>();
const emit = defineEmits(['update:iconIndx'])
const activeIndex = ref(0);
const goToIconNavigatePage = (componentType: string | undefined, goBackTitle: string | number | boolean, idx: number) => {
  activeIndex.value = idx;
  if (isMobile) {
    uni.navigateTo({
      url: `/pages/iconNavigate/index?icon=${componentType}`,
    });
    return;
  } else {
    // 只有大屏是 这样
    emit('update:iconIndx', idx);
  }

};
</script>

<style scoped lang="scss">
@font-face {
  font-family: CustomFont;
  src: url('../../../static/iconfont.ttf');
}

.read-nav-container {
  width: 100%;
  border-radius: 16rpx;
  height: 150rpx;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  position: relative;

  &__icon-background {
    width: 100%;
    height: 150rpx;
    position: absolute;
    background-color: $border-color;
    border-radius: 15px;
    transition: all 0.4s ease-in-out;
  }

  &__icon {
    flex: 1;
    display: flex;
    height: 100rpx;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;

    .icon-text {
      margin-left: 4rpx;
      font-size: 24rpx;
      letter-spacing: 2rpx;
    }

    .read-nav-container__icon-image {
      width: 24px;
      height: 24px;
    }

    &:hover {
      background: none !important;
    }
  }
}

@media screen and (max-width:600px) {
  .read-nav-container {
    height: fit-content;
    display: grid;
    grid-template-columns: repeat(4, 1fr);

    .read-nav-container__icon {
      display: flex;
      flex-direction: column;
      line-height: 1.5;
      justify-content: center;
      align-items: center;
      font-size: 30rpx;
      box-sizing: border-box;
      margin-bottom: 10px;

    }
  }
}

@media screen and (min-width:600px) {
  // .icon_active {
  //   background-color: $border-color;
  // }

  // .icon-text {
  //   margin-top: 10rpx;
  // }
}
</style>
