<template>
  <view class="navigation-module">
    <view v-for="item in navigationItems" :key="item.index" class="navigation">
      <uni-icons
        fontFamily="CustomFont"
        :size="item.index === activeNavigatorIndex ? '30' : '20'"
        :class="
          item.index === activeNavigatorIndex
            ? 'navigation__pink'
            : 'navigation__grey'
        "
        @click="handleNavigator(item.index)"
        :color="item.index === activeNavigatorIndex ? 'palevioletred' : '#999'"
      >
        {{ item.icon }}
      </uni-icons>
      <text
        :class="
          item.index === activeNavigatorIndex ? 'navigation-text-active' : ''
        "
        :style="
          item.index === activeNavigatorIndex
            ? navigatorVisibleStyle
            : navigatorHiddenStyle
        "
      >
        {{ ArticleModule[item.text] }}
      </text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import type { CSSProperties } from "vue";
import { ArticleModule } from "@/pages/index/types/index";
import { useHeadBarStore } from "@/store/useHeadBar";
import { storeToRefs } from "pinia";

type ArticleModuleKey = keyof typeof ArticleModule;
const { activeNavigatorIndex } = storeToRefs(useHeadBarStore());

interface NavigationItem {
  icon: string;
  index: number;
  text: ArticleModuleKey;
}

const navigationItems = ref<NavigationItem[]>([
  { icon: "\ue6af", index: 0, text: "paint" },
  { icon: "\ue782", index: 1, text: "write" },
  { icon: "\ue65b", index: 2, text: "candy" },
  { icon: "\ue6f0", index: 3, text: "communicate" },
  { icon: "\ue678", index: 4, text: "video" },
]);

const navigatorVisibleStyle: CSSProperties = {
  display: "flex",
  transform: "scaleX(1)",
  opacity: 1,
  fontSize: "30rpx",
  overflow: "hidden",
};

const navigatorHiddenStyle: CSSProperties = {
  display: "flex",
  transform: "scaleX(0)",
  opacity: 0,
  width: "0",
  fontSize: "0",
  overflow: "hidden",
};

const handleNavigator = (idx: number) => {
  activeNavigatorIndex.value = idx;
};
</script>

<style scoped lang="scss">
@font-face {
  font-family: CustomFont;
  src: url("../../static/iconfont.ttf");
}
@media screen and (max-width: 600px) {
  .navigation-module {
    width: 100vw;
    padding: 10rpx 0;
    background-color: white;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    column-gap: 10rpx;
    position: fixed;
    left: 0px;
    top: 0px;
    z-index: 1000;
    height: 60rpx;

    :nth-child(1) {
      margin-left: 10rpx;
    }
  }
  .navigation {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    font-size: 30rpx;
    font-weight: 700;
    font-family: var(--text-title-family);
    transition: 0.3s;

    :nth-child(2) {
      display: none;
      font-weight: 550;
      transition: 0.3s;
    }

    &__pink {
      color: var(--pink-color) !important;
      font-weight: 700;
    }

    &__grey {
      color: grey !important;
      opacity: 0.5;
    }

    .navigation-text-active {
      font-size: 30rpx;
      color: palevioletred !important;
      transition: 0.3s ease-in-out;
      height: 40rpx;
      font-weight: 700;
    }
  }
}
</style>
