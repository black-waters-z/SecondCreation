<template>
  <view class="ranks">
    <view v-for="(item, index) in article" :key="index" class="rank-card">
      <view class="rank-card__title">{{
        item.title || `热门内容 ${index + 1}`
      }}</view>
      <view class="rank-card__author">{{ item.author || "匿名作者" }}</view>
      <view v-if="zone === 0" class="rank-card__cover">图片内容</view>
      <view v-if="zone === 1" class="rank-card__text">文章内容</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";

const props = withDefaults(defineProps<{ article?: any; zone?: number }>(), {
  article: () => [
    { title: "", author: "" },
    { title: "", author: "" },
    { title: "", author: "" },
    { title: "", author: "" },
    { title: "", author: "" },
    { title: "1221121", author: "wangwu" },
    { title: "", author: "" },
    { title: "", author: "" },
    { title: "", author: "" },
    { title: "", author: "" },
    { title: "", author: "" },
    { title: "1221121", author: "wangwu" },
    { title: "", author: "" },
    { title: "", author: "" },
    { title: "", author: "" },
    { title: "", author: "" },
    { title: "", author: "" },
    { title: "1221121", author: "wangwu" },
  ],
  zone: 0,
});

onMounted(() => {
  console.log(props.zone);
});
</script>

<style scoped lang="scss">
.ranks {
  width: 95vw;
  column-count: 2;
  column-gap: 20rpx;
  box-sizing: border-box;
  margin-top: 20rpx;
}

.rank-card {
  break-inside: avoid;
  margin-bottom: 20rpx;
  padding: 20rpx;
  background: white;
  border-radius: 16rpx;

  &__title {
    font-size: 28rpx;
    font-weight: 700;
    color: #1f2933;
  }

  &__author {
    margin-top: 10rpx;
    font-size: 22rpx;
    color: #6b7280;
  }

  &__cover {
    width: 100%;
    margin-top: 16rpx;
    border-radius: 12rpx;
    height: 200rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #e5e7eb;
    color: #9ca3af;
  }

  &__text {
    background-color: #e5e7eb;
    min-height: 100rpx;
    border-radius: 12rpx;
    padding: 10rpx;
    margin-top: 16rpx;
  }
}
</style>
