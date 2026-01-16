<template>
  <view class="comment-container">
    <view class="comment-container-comment" v-for="(comment, index) in comments">
      <view class="first-comment">
        <one-comment :comment="comment" @showSecondCommentClick="showSecondCommentClick"></one-comment>
      </view>
      <view class="second-comment" v-if="showSecondComment" v-for="(secondComment, index) in comment?.secondComment">
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
    comments: () => [],
  }
);
</script>

<style lang="scss" scoped>
.comment-container {
  background: white;
  display: flex;
  flex-direction: column;
  width: 100%;

  &-comment {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}
</style>
