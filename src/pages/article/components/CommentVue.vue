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
          <one-comment v-for="(child, idx) in item.childs" :comment="child" type="child" @commentReply="commentReply"
            :key="idx"></one-comment>
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
  // result.forEach((item) => {
  //   let obj = []
  //   if (item.childs) {
  //     obj.push(...item.childs)
  //   }
  //   delete item.childs
  //   obj = [item, ...obj]
  //   childs.value.push(...obj);
  // })
  // console.log(childs.value)
  showSecondComment.value = true;
};

const showSecondCommentOpen = () => {
  showSecondComment.value = true;
};

defineProps<{
  comment: FirstComment;
}>()

const emit = defineEmits<{
  (e: 'commentReply', parent_id: number, parent_name: string, comment_type: 'first' | 'second' | 'child'): void
}>()
function commentReply(parent_id: number, parent_name: string, comment_type: 'first' | 'second' | 'child') {
  emit("commentReply", parent_id, parent_name, comment_type)
}

const insertChild = (child: ChildComment) => {
  childs.value.push(child)
  console.log('push', child)
}

defineExpose({
  insertChild,
  showSecondCommentOpen
})
</script>

<style lang="scss" scoped>
.comment-container {
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
