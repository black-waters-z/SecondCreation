<template>
  <view class="read-nav-container">
    <view
      v-for="item in navItems"
      :key="item.label"
      class="read-nav-container__icon"
      @click="goToIconNavigatePage(item?.type, item?.label)"
    >
      <uni-icons fontFamily="CustomFont" color="grey" size="25">
        {{ item.icon }}
      </uni-icons>
      <text class="icon-text"> {{ item.label }} </text>
    </view>
  </view>
</template>

<script setup lang="ts">
interface NavItems {
  icon: string;
  label: string;
  type?: string;
}
defineProps<{ navItems: NavItems[] }>();

const goToIconNavigatePage = (
  componentType: string | undefined,
  goBackTitle: string | number | boolean
) => {
  console.log(componentType);
  uni.navigateTo({
    url: `/pages/iconNavigate/index?icon=${componentType}&goBackTitle=${encodeURIComponent(
      goBackTitle
    )}`,
  });
};
</script>

<style scoped lang="scss">
@font-face {
  font-family: CustomFont;
  src: url("../../../static/iconfont.ttf");
}

.read-nav-container {
  width: 94vw;
  border-radius: 16rpx;
  height: 150rpx;
  background-color: white;
  margin: 20rpx 0;
  display: flex;
  align-items: center;

  &__icon {
    flex: 1;
    display: flex;
    height: 100rpx;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;

    .icon-text {
      margin-top: 5rpx;
      font-size: 25rpx;
    }
  }

  &__icon:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 25%; // 让线段垂直居中
    right: 0;
    width: 2rpx;
    height: 50%; // 长度 = 当前元素高度的 50%
    background-color: grey;
    opacity: 0.5;
  }
}
</style>
