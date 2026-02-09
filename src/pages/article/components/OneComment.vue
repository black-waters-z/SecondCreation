<template>
  <view class="oneComment" :style="{
    transform: type === 'second' ? 'scale(0.95)' : 'scale(1)',
  }">
    <view class="oneComment__user">
      <view class="oneComment__user__avatar">
        <image :src="comment?.user?.avatar_url" mode="aspectFill" />
      </view>
      <view class="oneComment__not-user-avatar">
        <view class="oneComment__user__info">
          <view class="oneComment__user__info__name">{{ comment?.user?.username }}</view>
          <view class="oneComment__user__info__time">{{
            new Date(comment?.created_at)?.toLocaleString()
            }}</view>

        </view>
        <view class="oneComment__content">
          <view class="oneComment__content__text">
            <text>
              {{ comment?.content }}
            </text>

          </view>
          <view class="oneComment__content__actions">
            <click-icon :type="['chat']" :size="16"
              @click="commentReply(comment?.id, comment?.user?.username)"></click-icon>
            <click-icon show-text class="oneComment__content__actions__icon" v-for="(item, idx) in iconType"
              :type="item" :key="idx" :num="comment?.like_count"></click-icon>
            <view class="second-comment-show" @click="
              emit('showSecondCommentClick');
            showText = '';
            " v-if="type === 'first' && comment?.reply_count > 0">
              <text>{{ showText }} </text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import ClickIcon from "@/components/base/ClickIcon/index.vue"
import { ref } from "vue";
import type { FirstComment } from "@/pages/article/type";
const iconType = [["redo-filled"], ["hand-up", "hand-up-filled"]]

withDefaults(
  defineProps<{
    comment: FirstComment;
    type?: string;
  }>(),
  {
    type: "first",
  }
);

const emit = defineEmits(["showSecondCommentClick", "commentReply"]);
const showText = ref<string>("展开回复");

function commentReply(commentId: number, parent_name?: string) {
  emit("commentReply", commentId, parent_name);
}
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
  transform-origin: right top;
  /* 右上角为缩放中心 */

  &__not-user-avatar {
    flex: 1;
  }

  &__user {
    display: flex;
    gap: 20rpx;

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
      gap: 18rpx;
      padding-left: 10rpx;

      &__name {
        font-size: 26rpx;
        font-weight: 600;
        color: $text-title;
      }

      &__time {
        font-size: 22rpx;
        color: #9ca3af;
        flex: 1;
        display: flex;
        justify-content: flex-end;
      }
    }
  }

  &__content {
    border-radius: 16rpx;
    padding: 10rpx;
    display: flex;
    flex-direction: column;

    &__text {
      font-size: 26rpx;
      color: #374151;
      line-height: 1.6;
      width: fit-content;
    }

    &__actions {
      display: flex;
      gap: 20rpx;
      font-size: 24rpx;
      flex-direction: row-reverse;
      flex: 1;

      &__icon {
        display: flex;
        align-items: flex-end;
      }
    }
  }
}

.second-comment-show {
  display: inline-block;
  flex: 1;
  font-size: 20rpx;
  opacity: 0.3;
}

::v-deep .icon-wrapper {
  display: flex;
  align-items: flex-end;
}
</style>
