<template>
  <view class="search-bar-container">
    <view class="search-container" :style="{ width: width, height: height }">
      <uni-icons
        fontFamily="CustomFont"
        color="white"
        size="15"
        class="search-container__icon"
        >{{ "&#xe60d;" }}
      </uni-icons>
    </view>
  </view>
</template>

<script setup lang="ts">
defineProps<{
  height: string;
  width: string;
}>();
</script>

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
  z-index: 2000;

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

@media screen and (max-width: 600px) {
  .search-bar-container {
    .search-container {
      &__icon {
        margin-left: 30rpx;
      }
    }
  }
}
</style>
