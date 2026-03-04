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

uni.onPageNotFound(() => {
  uni.redirectTo({
    url: '/pages/NoFound/index',
    fail: () => {
      uni.showToast({
        title: '404页面打开错误！'
      })
    },
  })
})
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
@import './style/global.scss';

:root {
  --pink-color: $pink-color;
}

page {
  --text-title-family: 'Source Han Sans';
  --background-color: white;
  --font-title-color: #1f2933;
  --grey-background-color: $grey-background-color;
  --pink-color: $pink-color;
  --status-bar-height: 50px;

  --content-margin-top: $content-margin-top;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 110rpx);
  // #ifdef MP-WEIXIN
  height: 100vh;
  // #endif
}

// text {
//   letter-spacing: 4rpx;
// }</style>
