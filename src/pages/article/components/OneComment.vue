<template>
  <view
    class="oneComment"
    :style="{
      width: type === 'second' ? '90%' : '95%',
      transform: type === 'second' ? 'scale(0.9)' : 'scale(1)',
    }"
  >
    <view class="oneComment__user">
      <view class="oneComment__user__avatar">
        <image :src="comment.avatar" mode="scaleToFill" />
      </view>
      <view class="oneComment__not-user-avatar">
        <view class="oneComment__user__info">
          <view class="oneComment__user__info__name">{{ comment.user }}</view>
          <view class="oneComment__user__info__time">{{
            comment.time.toLocaleString()
          }}</view>
        </view>
        <view class="oneComment__content">
          <view class="oneComment__content__text">{{ comment.content }}</view>
          <view class="oneComment__content__actions">
            <text>回复</text>
            <text>赞同</text>
            <view
              class="second-comment-show"
              @click="
                emit('showSecondCommentClick');
                showText = '';
              "
              v-if="type === 'first'"
            >
              <text>{{ showText }} </text></view
            >
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface OneComment {
  id: number;
  content: string;
  user: string;
  time: Date;
  avatar: string;
}

withDefaults(
  defineProps<{
    comment: OneComment;
    type?: string;
  }>(),
  {
    type: "first",
  }
);

const emit = defineEmits(["showSecondCommentClick"]);
const showText = ref<string>("展开回复");
</script>

<style scoped lang="scss">
.oneComment {
  display: flex;
  flex-direction: column;
  width: 95%;
  padding: 20rpx;
  padding-bottom: 0;
  border-bottom: 1rpx solid #f0f0f0;
  right: 0;
  background-color: white;
  float: right;
  transition-origin: top left;

  &__not-user-avatar {
    flex: 1;
  }

  &__user {
    display: flex;
    gap: 20rpx;
    margin-bottom: 12rpx;

    &__avatar {
      width: 70rpx;
      height: 70rpx;
      border-radius: 50%;
      background-color: #f4f4f5;
      overflow: hidden;

      image {
        width: 100%;
        height: 100%;
      }
    }

    &__info {
      display: flex;
      flex-direction: row;
      gap: 8rpx;
      margin-left: 20rpx;

      &__name {
        font-size: 26rpx;
        font-weight: 600;
        color: #1f2937;
      }

      &__time {
        font-size: 22rpx;
        color: #9ca3af;
      }
    }
  }

  &__content {
    border-radius: 16rpx;
    padding: 10rpx;
    display: flex;
    flex-direction: column;
    gap: 8rpx;

    &__text {
      font-size: 26rpx;
      color: #374151;
      line-height: 1.6;
    }

    &__actions {
      display: flex;
      gap: 30rpx;
      font-size: 24rpx;
      color: $pink-color;
    }
  }
}

.second-comment-show {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}
</style>
