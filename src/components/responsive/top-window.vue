<template>
  <view>
    <view class="top-window-container">
      <view class="top-window-container__info" :class="{ 'top-window-container__info__active': pcHeadBar.headActive }">
        <tab-bar></tab-bar>
      </view>
    </view>
    <view class="top-window-container__ad" v-if="pcHeadBar.adActive">
      <text>欢迎进站，现在充值可享9折优惠，买一件商品赠送99积分。</text>
      <uni-icons type="close" color="white" size="24" style="margin-left: auto;cursor: pointer;"
        @click="pcHeadBar.closeAdBar" />
    </view>
  </view>

</template>
<script setup lang="ts">
import TabBar from "@/components/common/TabBar/index.vue";
import { usePcHeadBar } from "@/store/usePcHeadBar"

const pcHeadBar = usePcHeadBar()

// watch(() => pcHeadBar.headActive, (newValue) => {
//   console.log(newValue, 'change')
// })

</script>
<style scoped lang="scss">
.top-window-container {
  width: 100%;
  background-color: white;
  height: 60px;
  overflow: hidden;
  z-index: 100;
  // position: fixed;
  box-shadow: $grey-shadow-02;

  &__info {
    width: 100%;
    background-color: white;
    transition: all 0.3s ease-in-out;
    transform: translateY(-100%);
    height: 60px;

    &__active {
      transform: translateY(0);
    }
  }

  &__ad {
    width: 100%;
    position: fixed;
    top: 60px;
    z-index: 500;

    transform: translateY(0);
    height: 60px;
    padding: 20rpx 100px;
    box-sizing: border-box;
    color: white;
    text-shadow: $grey-shadow-02;
    display: flex;
    align-items: center;
    backdrop-filter: blur(2px);
    background-color: rgba(134, 132, 132, 0.333);

  }
}

@media screen and (max-width:600px) {
  .top-window-container {
    display: none;

    &__ad {
      top: 40px;
      padding: 0 20px;
      font-size: 23rpx;
    }
  }
}
</style>
