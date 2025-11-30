<template>
  <view class="content">
    <view class="icon-component-container">
      <swiper class="swiper">
        <swiper-item v-for="value in articlesWithFilter">
          <view class="swiper-pane">
            <Articles
              :styles="{ 'grid-template-columns': 'repeat(3, 1fr)' }"
              :zone="value"
            ></Articles>
          </view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script setup lang="ts">
import Articles from "../common/Articles.vue";

const articlesWithFilter = [0, 1];
</script>

<style lang="scss" scoped>
.icon-component-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.swiper {
  width: 100vw;
  // #ifdef MP-WEIXIN
  height: calc(100vh - 150rpx);
  // #endif
  // #ifdef H5
  height: calc(100vh - 80rpx);
  // #endif
}

.swiper-pane {
  height: 100%;
  overflow-y: auto; // 内容超出时内部滚动，外部高度不变
  display: flex;
  flex-direction: column;
  align-items: center;
}

.uni-swiper-slide-frame {
  overflow-y: auto;
}
</style>
