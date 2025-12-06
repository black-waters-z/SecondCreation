<template>
  <view class="search-bar-container">
    <div class="search-container">
      <uni-icons fontFamily="CustomFont" color="white" size="15"
        >{{ "&#xe60d;" }}
      </uni-icons>
    </div>
  </view>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@font-face {
  font-family: CustomFont;
  src: url("../../static/iconfont.ttf");
}

$icon-grey: #707070;

.search-bar-container {
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 2000;

  // #ifdef MP-WEIXIN
  transform: translateX(-50%);
  top: 80rpx;
  // #endif

  // #ifdef H5
  position: sticky;
  top: 0;
  // #endif

  .search-container {
    width: 300px;
    height: 40px;
    background-color: #707070;
    opacity: 0.2;
    border-radius: 1000px;
    color: white;
    text-align: center;
    margin: 5rpx 0;
    display: flex;
    flex-direction: row;
    align-items: center;

    uni-text {
      margin-left: 30px;
    }
  }
}
</style>
