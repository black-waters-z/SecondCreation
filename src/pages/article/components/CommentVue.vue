<template>
  <view class="comment-container">
    <view class="comment" v-for="(comment, index) in comments">
      <view class="first-comment">
        <one-comment
          :comment="comment"
          @showSecondCommentClick="showSecondCommentClick"
        ></one-comment>
      </view>

      <view
        class="second-comment"
        v-if="showSecondComment"
        v-for="(secondComment, index) in comment?.secondComment"
      >
        <one-comment :comment="secondComment" type="second"></one-comment>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import OneComment from "./OneComment.vue";
import { ref } from "vue";

interface Comment {
  id: number;
  content: string;
  user: string;
  time: Date;
  avatar: string;
  secondComment?: Comment[];
}

const showSecondComment = ref<Boolean>(false);

const showSecondCommentClick = () => {
  showSecondComment.value = true;
};

withDefaults(
  defineProps<{
    comments: Comment[];
  }>(),
  {
    comments: () => [
      {
        id: 0,
        content: "默认评论",
        user: "匿名用户",
        time: new Date("2022-01-01"),
        avatar: "",
        secondComment: [
          {
            id: 1,
            content: "默认二级评论1",
            user: "匿名用户1",
            time: new Date("2022-01-01"),
            avatar: "",
          },
          {
            id: 2,
            content: "默认二级评论2",
            user: "匿名用户2",
            time: new Date("2022-01-01"),
            avatar: "",
          },
        ],
      },
    ],
  }
);
</script>

<style lang="scss" scoped>
.comment-container {
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  .comment {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-bottom: 20rpx;
    position: relative;

    .second-comment-show {
      margin-right: 20rpx;
      bottom: 10rpx;
      font-size: 20rpx;
    }

    .first-comment {
      width: 100%;
      flex: 1;
    }
  }

  .second-comment {
    width: 100%;
    flex: 1;
  }
}
</style>
