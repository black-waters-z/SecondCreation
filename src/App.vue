<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
import { usePostSheetStore } from './store/usePostSheet';

onLaunch(() => {
  if (import.meta.env.DEV) {
    console.log('App Launch');
  }
  const postSheetStore = usePostSheetStore();
  // #ifdef H5
  uni.onTabBarMidButtonTap(() => {
    postSheetStore.toggle();
  });
  // #endif
});
onShow(() => {
  console.log('App Show');
});
onHide(() => {
  console.log('App Hide');
});
</script>
<style lang="scss">
@import 'uni';
@import 'uview-plus/index.scss';
@import './static/iconfont.css';

:root {
  --pink-color: $pink-color;
}

page {
  background-color: $grey-background-color;
  --text-title-family: 'Source Han Sans';
  --background-color: white;
  --font-title-color: #1f2933;
  --grey-background-color: $grey-background-color;
  --pink-color: $pink-color;
  --status-bar-height: 50px;

  --content-margin-top: $content-margin-top;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 100rpx);
  // #ifdef MP-WEIXIN
  height: 100vh;
  // #endif
}

// text {
//   letter-spacing: 4rpx;
// }

.letter-spacing-4 {
  letter-spacing: 4rpx;
}

.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  min-height: 0;
  flex: 1; // 让内容区占满页面，在小程序内为子 scroll-view 提供高度参考
}

.absolute {
  position: absolute;
}

.relative {
  position: relative;
}

.content::-webkit-scrollbar {
  display: none;
}

.w-100 {
  width: 100%;
}

.mh-0 {
  min-height: 0;
}

.mt-80-weixin {
  // #ifdef MP-WEIXIN
  margin-top: 80rpx;
  // #endif
}

.bg-white {
  background-color: white;
}

.w-full {
  width: 100%;
}

.overflow-y-scroll {
  overflow-y: scroll;
}

.h-100 {
  height: 100%;
}

.flex {
  display: flex;
}

.flex-1 {
  flex: 1;
}

.position-sticky {
  position: sticky;
}

.top-0 {
  top: 0;
}

.top-80 {
  top: 80rpx;
}

.z-100 {
  z-index: 100;
}

.justify-center {
  justify-content: center;
}

.item-center {
  align-items: center;
}

.justify-end {
  justify-content: flex-end;
}

.flex-row {
  flex-direction: row;
}

.flex-column {
  flex-direction: column;
}

.uni-scroll-view-refresher {
  background-color: var(--grey-background-color) !important;
}

.margin-y-10 {
  margin-top: 30rpx;
  margin-bottom: 30rpx;
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
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  list-style: none;
}

uni-scroll-view .uni-scroll-view::-webkit-scrollbar {
  display: none;
  width: 0 !important;
  height: 0 !important;
  -webkit-appearance: none;
  background: transparent;
  color: transparent;
}

// 宽屏隐藏tabbar
.uni-app--showleftwindow+.uni-tabbar-bottom {
  display: none;
}

.uni-app--showleftwindow uni-content {
  display: flex;
  justify-content: center;
  gap: 0;
}

.uni-app--showleftwindow uni-content {
  margin: 0 auto;
}

.uni-app--showleftwindow uni-left-window {
  flex-shrink: 0;
}

.uni-top-window {
  height: 80px !important;
}

uni-layout {
  display: flex;
  flex-direction: column;
}

// #endif

@media screen and (min-width: 600px) {
  .uni-app--showtabbar uni-page-wrapper {
    height: 100%;
  }

  uni-content {
    width: calc(100% - 100px);
  }

  .content {
    position: relative;
  }

  .uni-app--showleftwindow uni-main,
  uni-main {
    min-height: auto;
    height: calc(100vh - 80px);
    overflow: hidden;
  }

  page {
    background-color: white;
    height: 100%;
  }

  .nomobile-disappear {
    display: none;
  }
}
</style>
