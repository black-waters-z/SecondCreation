<template>
  <view class="whole-article w-full">
    <video class="whole-article__video" :src="article?.image_urls?.[0]"
      v-if="article?.image_urls?.length && isVideo(article?.image_urls?.[0])"></video>
    <CommonSwiper v-if="article?.image_urls?.length && !isVideo(article?.image_urls?.[0])"
      :styles="{ maxHeight: '1600rpx' }" :swiper-info="swiperInfo">
    </CommonSwiper>
    <view class="whole-article__content">
      <view class="whole-article__author w-full">
        <article-author :user-info="userInfo"></article-author>
      </view>
      <text class="whole-article__content-title">{{ article?.title }}</text>
      <view class="whole-article__content-content">
        <view class="whole-article__content-content-subtitle" v-if="article?.subtitle">{{ article?.subtitle
        }}</view>
        <text class="whole-article__content-content-text">{{ article?.content }}</text>
      </view>
      <Tip></Tip>
      <slot name="collection"></slot>
      <view class="whole-article__contact">
        <click-icon show-text v-for="(item, index) in iconInfo" :key="index" :num="item.num"
          class="whole-article__contact-icon" :hasBeenLiked="item.hasBeenLiked" :type="item.type"
          :size="26"></click-icon>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import ArticleAuthor from "./ArticleAuthor.vue";
import type { ArticleType } from "@/components/common/Article/type";
import ClickIcon from "@/components/base/ClickIcon/index.vue";
import type { UserInfo } from "@/pages/user/type";
import { computed } from "vue";
import CommonSwiper from "@/components/common/CommonSwiper.vue";
import Tip from "./Tip.vue"
const props = defineProps<{
  article: ArticleType;
  userInfo: UserInfo
}>();
const iconInfo = computed(() => [{
  type: ["redo-filled"],
},
{
  type: ["heart", "heart-filled"],
  num: props.article?.favorite_count ?? 0,
  hasBeenLiked: props.article?.has_favorited ?? false
},
{
  type: ["hand-up", "hand-up-filled"],
  num: props.article?.like_count ?? 0,
  hasBeenLiked: props.article?.has_liked ?? false
}
])

const swiperInfo = computed(() => {
  return props.article?.image_urls?.map(item => ({
    swiperImg: item,
  })) || []
})

const isVideo = (url: string) => {
  const fileExtension = url.split('.').pop().toLowerCase();
  const videoExtensions = ['mp4', 'avi', 'mkv', 'webm', 'mov', 'flv', 'wmv'];
  if (videoExtensions.includes(fileExtension)) return true;
  return false;
};
</script>

<style lang="scss" scoped>
.whole-article {
  display: flex;
  flex-direction: column;
  align-items: center;
  letter-spacing: 1rpx;

  &__video {
    width: 100%;
    object-fit: cover;
  }

  &__content {
    width: 100%;
    background-color: white;
    box-sizing: border-box;
    padding: 0 20px;

    &-title {
      width: 100%;
      display: block;
      font-size: 40rpx;
      font-weight: 500;
      margin: 30rpx 0;
      box-sizing: border-box;
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
    justify-content: space-around;

    &-icon {
      margin-right: 20rpx;
    }
  }

}
</style>