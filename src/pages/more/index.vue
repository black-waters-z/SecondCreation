<template>
  <view class="content">
    <head-nav></head-nav>
    <common-swiper :styles="{ width: '100vw', height: '30vw' }"></common-swiper>
    <MoreNavigatorBar> </MoreNavigatorBar>
    <favorite-bar></favorite-bar>
  </view>
</template>

<script setup lang="ts">
import MoreNavigatorBar from "./components/MoreNavigatorBar.vue";
import FavoriteBar from "./components/FavoriteBar.vue";
import CommonSwiper from "@/components/common/CommonSwiper.vue";
import HeadNav from "@/components/common/HeadNav.vue";
</script>

<style lang="scss" scoped></style>
