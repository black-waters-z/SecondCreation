<template>
  <view class="content">
    <head-nav></head-nav>
    <go-back></go-back>
    <uni-title type="h3" title="角色百科 "></uni-title>
    <Filter
      v-model="filterIndex"
      :filters="filters"
      margin-top="70rpx"
    ></Filter>
    <!-- 点击了哪个，就显示哪个。 -->
    <CharacterSimpleInfo></CharacterSimpleInfo>
  </view>
</template>

<script setup lang="ts">
import HeadNav from "@/components/common/HeadNav.vue";
import CharacterSimpleInfo from "./components/CharacterSimpleInfo.vue";
import GoBack from "@/components/common/GoBack.vue";
import Filter from "@/components/common/Filter.vue";
import { ref } from "vue";
const filterIndex = ref(0);
const filters = ["甘织玲奈子", "濑名紫阳花"];
</script>

<style lang="scss" scoped>
// #ifdef MP-WEIXIN
$content-margin-top: 140rpx;
// #endif
// #ifdef H5
$content-margin-top: 80rpx;
// #endif
.content {
  margin-top: $content-margin-top;
}

.uni-title__box {
  justify-content: flex-start;
  flex: 0;
}
</style>
