<template>
  <view class="comment-container">
    <view class="comment-container-comment">
      <view class="first-comment">
        <one-comment :comment="comment" @showSecondCommentClick="showSecondCommentClick(comment?.id)"
          @commentReply="commentReply"></one-comment>
      </view>
      <view class="w-full" v-if="showSecondComment">
        <view class="second-comment" v-for="(item, index) in childs" :key="index">
          <one-comment :comment="item" type="second" @commentReply="commentReply"></one-comment>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import OneComment from "./OneComment.vue";
import { ref } from "vue";
import { getChildCommentListByCommentId } from "@/api/articleCommentApi"
import type { FirstComment, ChildComment } from "../type"
const showSecondComment = ref<boolean>(false);

const childs = ref<ChildComment[]>([])
const showSecondCommentClick = async (parent_id: number) => {
  childs.value = await getChildCommentListByCommentId(parent_id)
  showSecondComment.value = true;
};

const showSecondCommentOpen = () => {
  showSecondComment.value = true;
};

const props = defineProps<{
  comment: FirstComment;
}>()

const emit = defineEmits<{
  (e: 'commentReply', parent_id: number, parent_name: string): void
}>()
function commentReply(parent_id: number, parent_name: string) {
  emit("commentReply", parent_id, parent_name)
}

const insertChild = (child: ChildComment) => {
  childs.value.push(child)
}

defineExpose({
  insertChild,
  showSecondCommentOpen
})
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

  .second-comment {
    display: flex;
    flex-direction: column;
  }
}
</style>
