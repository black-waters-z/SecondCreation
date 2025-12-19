<template>
  <view class="rank-card">
    <view v-if="zone === 0" class="rank-card__cover">
      <image
        v-if="!loadComplete"
        :class="[
          'rank-card__cover__image',
          coverLoaded && 'rank-card__cover__image--visible',
        ]"
        :src="article?.image"
        mode="aspectFill"
        @load="handleImageLoad"
        @error="handleImageError"
      />
      <image
        v-if="loadComplete"
        :class="[
          'rank-card__cover__image',
          !coverLoaded && 'rank-card__cover__image--visible',
        ]"
        :src="'/static/common/ImageLoadError.jpg'"
        mode="aspectFill"
      />
      <view
        v-if="!coverLoaded && !loadComplete"
        class="rank-card__cover__loading"
      >
        <view class="rank-card__cover__loading-spinner"></view>
        <text class="rank-card__cover__loading-text">加载中...</text>
      </view>
    </view>
    <view v-if="zone === 1" class="rank-card__text">
      <view class="rank-card__text__container">
        <text class="rank-card__text__container__text"
          >在很久很久以前，有个被遗忘在山谷里的小村庄。</text
        >
      </view>
    </view>
    <view class="rank-card__title" @click="goToArticle">{{
      article?.title || "标题"
    }}</view>
    <view class="rank-card__author">{{ article?.author || "匿名作者" }}</view>
  </view>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import type { Article as ArticleType } from "@/types/index";

const props = withDefaults(
  defineProps<{ article?: ArticleType; zone?: number; styles?: any }>(),
  {
    zone: 0,
  }
);
const coverLoaded = ref<boolean>(false);
const loadComplete = ref<boolean>(false);
let loadTimers: ReturnType<typeof setTimeout> | null = null;

const clearLoadTimeout = () => {
  if (loadTimers) {
    clearTimeout(loadTimers);
  }
};

const startLoadTimeout = () => {
  loadTimers = setTimeout(() => {
    loadComplete.value = true;
    clearLoadTimeout();
  }, 5000);
};

const handleImageLoad = () => {
  coverLoaded.value = true;
  clearLoadTimeout();
};

const handleImageError = () => {
  coverLoaded.value = false;
};
function goToArticle() {
  uni.navigateTo({
    url: `../article/index?art_id=${1}`,
  });
}

onMounted(() => {
  startLoadTimeout();
});

onUnmounted(() => {
  clearLoadTimeout();
});
</script>

<style lang="scss" scoped>
.rank-card {
  break-inside: avoid;
  margin-bottom: 20rpx;
  background: white;
  border-radius: 16rpx;
  border: 1px solid rgba(229, 231, 235, 0.5);

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
    border-radius: 12rpx;
    aspect-ratio: 1/1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #9ca3af;
    position: relative;
    overflow: hidden;

    &__image {
      width: 100%;
      aspect-ratio: 1/1;
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
      width: 80%;
      background-color: #e5e7eb;
      border-radius: 12rpx;
      position: relative;
      padding: 20rpx;
      font-size: 23rpx;
      color: #1f2933;
      letter-spacing: 1px;
      overflow: hidden;
      height: 220px;
      &__text {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 13;
        white-space: normal;
      }
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
