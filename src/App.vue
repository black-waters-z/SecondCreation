<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { usePostSheetStore } from "./store/usePostSheet";

onLaunch(() => {
  if (import.meta.env.DEV) {
    console.log("App Launch");
  }
  const postSheetStore = usePostSheetStore();
  // #ifdef H5
  uni.onTabBarMidButtonTap(() => {
    postSheetStore.toggle();
  });
  // #endif
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style lang="scss">
@import "./static/iconfont.css";

$background-color: white;
$grey-background-color: rgb(248, 248, 248);
$pink-color: rgb(244, 143, 177);
// #ifdef MP-WEIXIN
$content-margin-top: 0rpx;
// #endif
// #ifdef H5
$content-margin-top: 80rpx;
// #endif
page {
  background-color: $grey-background-color;
  --text-title-family: "Source Han Sans";
  --background-color: white;
  --font-title-color: #1f2933;
  --grey-background-color: #{$grey-background-color};
  --pink-color: #{$pink-color};
  --status-bar-height: 50px;

  --content-margin-top: $content-margin-top;
  display: flex;
}
.content {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  background-color: var(--grey-background-color);
}

.content::-webkit-scrollbar {
  display: none;
}

// #ifdef MP-WEIXIN || APP-PLUS
::-webkit-scrollbar {
  display: none;
  width: 0 !important;
  height: 0 !important;
  -webkit-appearance: none;
  background: transparent;
  color: transparent;
}
// #endif

/* 解决H5的问题 */
// #ifdef H5
uni-scroll-view .uni-scroll-view::-webkit-scrollbar {
  display: none;
  width: 0 !important;
  height: 0 !important;
  -webkit-appearance: none;
  background: transparent;
  color: transparent;
}

// 宽屏隐藏tabbar
.uni-app--showleftwindow + .uni-tabbar-bottom {
  display: none;
}

.uni-app--showleftwindow uni-content {
  display: flex;
  justify-content: center;
  gap: 0;
  width: 100%;
}

.uni-app--showleftwindow uni-content {
  max-width: 1200px;
  margin: 0 auto;
}

.uni-app--showleftwindow uni-left-window {
  flex-shrink: 0;
}

.uni-app--showleftwindow uni-main {
  flex: 1;
  max-width: 900px;
}

// #endif

@media screen and (min-width: 750px) {
  .content {
    width: 60vw;
    position: relative;
  }
}
</style>
