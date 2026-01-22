<template>
  <view class="whole-article w-full">
    <go-back></go-back>
    <view class="whole-article__content">
      <text class="whole-article__content-title">TELL ME A PIECE OF YOUR HISTORY</text>
      <view class="whole-article__author w-full">
        <article-author></article-author>
      </view>
      <view class="whole-article__content-content">
        <view class="whole-article__content-content-subtitle">subtitle</view>
        <view class="whole-article__content-content-image"></view>
        <text class="whole-article__content-content-text">I got to ask Wang Yao (the embodiment of my home nation,
          China) a few questions the other \n\n day after his existence was revealed. He has been living over my
          restaurant
          for the past eight…
          \n\n
          HD </text>
      </view>
      <view class="whole-article__contact">
        <click-icon show-text v-for="(item, index) in iconType" :key="index" class="whole-article__contact-icon"
          :type="item" :size="26"></click-icon>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import GoBack from "@/components/common/GoBack.vue";
import ArticleAuthor from "./ArticleAuthor.vue";
import type { ArticleType } from "@/components/common/Article/type";
import ClickIcon from "@/components/base/ClickIcon/index.vue";
const iconType = [["redo-filled"], ["heart", "heart-filled"], ["hand-up", "hand-up-filled"]]
defineProps<{
  article: ArticleType;
}>();
</script>

<style lang="scss" scoped>
.whole-article {
  display: flex;
  flex-direction: column;
  align-items: center;
  letter-spacing: 1rpx;

  &__content {
    width: 100%;
    min-height: 300px;
    background-color: white;
    box-sizing: border-box;
    padding: 0 20px;

    &-title {
      width: fit-content;
      display: block;
      font-size: 40rpx;
      font-weight: 500;
      text-align: center;
      margin-bottom: 10rpx;
      box-sizing: border-box;
      padding: 0px 75rpx;
    }

    &-content {
      font-size: 30rpx;
      font-weight: 350;
      margin-bottom: 20rpx;

      &-subtitle {
        font-weight: 200;
        font-style: italic;
        font-size: 30rpx;
        margin-bottom: 40rpx;

        &::before {
          content: ':';
          margin-right: 10rpx;
        }
      }
    }
  }

  &__contact {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    margin-bottom: 20rpx;

    &-icon {
      margin-right: 20rpx;
    }
  }
}
</style>