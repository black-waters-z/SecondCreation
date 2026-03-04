<template>
  <view class="top-window-container">
    <view class="top-window-container__info" :class="{ 'top-window-container__info__active': pcHeadBar.headActive }">
      <tab-bar></tab-bar>
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
  height: 44px;
  overflow: hidden;
  z-index: 100;
  // position: fixed;
  box-shadow: $grey-shadow-02;

  &__info {
    width: 100%;
    background-color: white;
    transition: all 0.3s ease-in-out;
    transform: translateY(-100%);
    height: 44px;

    &__active {
      transform: translateY(0);
    }
  }
}

@media screen and (max-width:600px) {
  .top-window-container {
    display: none;
  }
}
</style>
