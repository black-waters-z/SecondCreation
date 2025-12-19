<template>
  <!-- styles可以传入grid的列数 -->
  <view class="ranks" :style="styles">
    <Article
      v-for="(item, index) in article"
      :key="index"
      :article="item"
      :zone="zone"
    >
    </Article>
  </view>
</template>

<script lang="ts" setup>
import Article from "./Article.vue";
const props = withDefaults(
  defineProps<{ article?: any; zone?: number; styles?: any }>(),
  {
    article: () => [
      { title: "", author: "", image: "/static/character/character1.png" },
      { title: "", author: "", content: "我是一只小小小鸟啊啊啊" },
      { title: "", author: "" },
      { title: "", author: "" },
      { title: "", author: "" },
      { title: "1221121", author: "wangwu" },
      { title: "", author: "", image: "/static/character/character1.png" },
      { title: "", author: "", content: "我是一只小小小鸟啊啊啊" },
      { title: "", author: "" },
      { title: "", author: "" },
      { title: "", author: "" },
      { title: "1221121", author: "wangwu" },
      { title: "", author: "", image: "/static/character/character1.png" },
      { title: "", author: "", content: "我是一只小小小鸟啊啊啊" },
      { title: "", author: "" },
      { title: "", author: "" },
      { title: "", author: "" },
      { title: "1221121", author: "wangwu" },
      { title: "", author: "", image: "/static/character/character1.png" },
      { title: "", author: "", content: "我是一只小小小鸟啊啊啊" },
      { title: "", author: "" },
      { title: "", author: "" },
      { title: "", author: "" },
      { title: "1221121", author: "wangwu" },
      { title: "", author: "", image: "/static/character/character1.png" },
      { title: "", author: "", content: "我是一只小小小鸟啊啊啊" },
      { title: "", author: "" },
      { title: "", author: "" },
      { title: "", author: "" },
      { title: "1221121", author: "wangwu" },
    ],
    zone: 0,
  }
);
</script>

<style scoped lang="scss">
.ranks {
  width: 98%;
  top: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5rpx;
  box-sizing: border-box;
  margin: 0 auto;
  margin-top: 20rpx;
}

.rank-card {
  break-inside: avoid;
  margin-bottom: 20rpx;
  background: white;
  border-radius: 16rpx;

  &__title {
    padding: 0 20rpx;
    padding-top: 10rpx;
    font-size: 28rpx;
    font-weight: 700;
    color: #1f2933;
  }

  &__author {
    padding: 0 20rpx;
    font-size: 22rpx;
    color: #6b7280;
  }

  &__cover {
    width: 100%;
    margin-top: 16rpx;
    border-radius: 12rpx;
    aspect-ratio: 1/1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #9ca3af;
    position: relative;
    overflow: hidden;

    &__image {
      width: calc(100% - 5rpx);
      height: calc(100% - 5rpx);
      border-radius: 12rpx;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &__image--visible {
      opacity: 1;
    }

    &__loading {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: linear-gradient(
        120deg,
        rgba(255, 255, 255, 0.7),
        rgba(245, 245, 245, 0.9)
      );
      gap: 10rpx;
    }

    &__loading-spinner {
      width: 40rpx;
      height: 40rpx;
      border-radius: 50%;
      border: 4rpx solid rgba(244, 143, 177, 0.3);
      border-top-color: $pink-color;
      animation: rank-card-spin 1s linear infinite;
    }

    &__loading-text {
      font-size: 22rpx;
      color: #6b7280;
    }
  }

  &__text {
    border-radius: 12rpx;
    margin-top: 16rpx;
    display: flex;
    justify-content: center;
    padding: {
      bottom: 10rpx;
    }

    &__container {
      background-color: white;
      width: calc(80%);
      height: 100rpx;
      background-color: #e5e7eb;
      border-radius: 12rpx;
      position: relative;
      padding: 20rpx;
      font-size: 23rpx;
      color: #1f2933;
      letter-spacing: 1px;
      overflow: hidden;
    }
  }
}

@keyframes rank-card-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
