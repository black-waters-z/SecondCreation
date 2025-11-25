<template>
  <view class="ranks">
    <view v-for="(item, index) in article" :key="index" class="rank-card">
      <view class="rank-card__title" @click="goToArticle">{{
        item.title || `热门内容 ${index + 1}`
      }}</view>
      <view class="rank-card__author">{{ item.author || "匿名作者" }}</view>
      <view v-if="zone === 0" class="rank-card__cover">
        <image
          v-if="!loadComplete[index]"
          :class="[
            'rank-card__cover__image',
            coverLoaded[index] && 'rank-card__cover__image--visible',
          ]"
          :src="item.image"
          mode="aspectFill"
          @load="handleImageLoad(index)"
          @error="handleImageError(index)"
        />
        <image
          v-if="loadComplete[index]"
          :class="[
            'rank-card__cover__image',
            !coverLoaded[index] && 'rank-card__cover__image--visible',
          ]"
          :src="'/static/common/ImageLoadError.jpg'"
          mode="aspectFill"
        />
        <view
          v-if="!coverLoaded[index] && !loadComplete[index]"
          class="rank-card__cover__loading"
        >
          <view class="rank-card__cover__loading-spinner"></view>
          <text class="rank-card__cover__loading-text">加载中...</text>
        </view>
      </view>
      <view v-if="zone === 1" class="rank-card__text">
        <view class="rank-card__text__container">
          <text class="rank-card__text__container__text">这是文章的内容。</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

function goToArticle() {
  uni.navigateTo({
    url: `../article/index?art_id=${1}`,
  });
}

const props = withDefaults(defineProps<{ article?: any; zone?: number }>(), {
  article: () => [
    { title: "", author: "", image: "/static/character/character1.png" },
    { title: "", author: "", content: "我是一只小小小鸟啊啊啊" },
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

const coverLoaded = ref<Record<number, boolean>>({});
const loadComplete = ref<Record<number, boolean>>({});
const loadTimers: Record<number, ReturnType<typeof setTimeout> | undefined> =
  {};
const fallbackDelay = 10000;

const clearLoadTimeout = (index: number) => {
  const timer = loadTimers[index];
  if (timer) {
    clearTimeout(timer);
    delete loadTimers[index];
  }
};

const startLoadTimeout = (index: number) => {
  clearLoadTimeout(index);
  loadTimers[index] = setTimeout(() => {
    if (!coverLoaded.value[index]) {
      loadComplete.value[index] = true;
    }
  }, fallbackDelay);
};

const ensureCoverState = () => {
  props.article.forEach((_: any, index: number) => {
    if (!(index in coverLoaded.value)) {
      coverLoaded.value[index] = false;
      loadComplete.value[index] = false;
      startLoadTimeout(index);
    }
  });
};

watch(() => props.article.length, ensureCoverState, { immediate: true });

const handleImageLoad = (index: number) => {
  coverLoaded.value[index] = true;
  loadComplete.value[index] = false;
  clearLoadTimeout(index);
};

const handleImageError = (index: number) => {
  coverLoaded.value[index] = false;
  loadComplete.value[index] = true;
  clearLoadTimeout(index);
};

onBeforeUnmount(() => {
  Object.keys(loadTimers).forEach((key) => {
    const index = Number(key);
    clearLoadTimeout(index);
  });
});
</script>

<style scoped lang="scss">
.ranks {
  width: 95vw;
  height: 100%;
  top: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
  box-sizing: border-box;
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
      border-top-color: var(--pink-color);
      animation: rank-card-spin 1s linear infinite;
    }

    &__loading-text {
      font-size: 22rpx;
      color: #6b7280;
    }
  }

  &__text {
    min-height: 150rpx;
    border-radius: 12rpx;
    margin-top: 16rpx;
    display: flex;
    justify-content: center;
    padding: {
      bottom: 10rpx;
    }

    &__container {
      background-color: white;
      width: calc(90% - 20rpx);
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
