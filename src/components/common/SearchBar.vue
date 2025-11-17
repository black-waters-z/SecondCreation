<template>
  <view class="search-bar-container">
    <div class="search-container">
      <uni-icons fontFamily="CustomFont" color="white" size="15"
        >{{ "&#xe60d;" }}
      </uni-icons>
    </div>
  </view>
</template>

<style scoped lang="scss">
@font-face {
  font-family: CustomFont;
  src: url("../../static/iconfont.ttf");
}

$icon-grey: #707070;

.search-bar-container {
  width: 100vw;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 2000;
  top: 0;

  // #ifdef MP-WEIXIN
  transform: translateX(-50%);
  // #endif

  // #ifdef H5
  position: sticky;
  top: 0;
  // #endif

  .search-container {
    width: 60vw;
    background-color: #707070;
    opacity: 0.2;
    border-radius: 1000px;
    color: white;
    text-align: center;
    margin: 5rpx 0;
  }
}
</style>
