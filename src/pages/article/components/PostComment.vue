<template>
  <view class="post-comment w-100">
    <up-textarea class="post-comment__textarea" :class="{ focus_border: isFocus }" v-model="comment"
      :placeholder="'@' + commentToward.parent_name" autoHeight @focus="isFocus = !isFocus"
      @blur="isFocus = !isFocus"></up-textarea>
    <SCButton type="button" @click="sendComment"><text>发送</text></SCButton>
  </view>
</template>

<script setup lang="ts">
import SCButton from "@/components/common/SCButton/index.vue";
import { ref, watch } from "vue";
const props = defineProps<{ commentToward: { content: string, parent_id?: number, parent_name?: string, article_id: number, comment_type: 'first' | 'second' | 'child' } }>()
const emit = defineEmits(['sendComment', 'update:commentToward'])
const comment = ref<string>();
const isFocus = ref(false);

function sendComment() {
  emit('sendComment', comment.value)
  comment.value = ''
}

function cleanMention(text: string, name: string): string {
  if (!name) return text
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return text.replace(new RegExp(`@${escaped}\\s*`, 'g'), '')
}

watch(
  () => [comment.value, props.commentToward.comment_type],
  ([newComment, newCommentType]) => {
    if (newCommentType !== 'first') {
      if (newComment?.includes(`@${props.commentToward.parent_name}`)) return;
      comment.value = `@${props.commentToward.parent_name} ${comment.value || ''}` + `${comment.value || ''}`;
    } else {
      if (comment.value?.includes(`@${props.commentToward.parent_name}`)) {
        comment.value = cleanMention(comment.value, `${props.commentToward.parent_name}`)
      }
    }
  }
);

</script>

<style lang="scss" scoped>
.post-comment {
  box-sizing: border-box;
  padding: 10px;
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;


  ::v-deep .u-textarea__field {
    min-height: 20px !important;
  }

  &__textarea {
    width: 95%;
  }

  .focus_border {
    border-color: $pink-color !important;
  }

  ::v-deep .button-bt {
    font-size: 26rpx;
  }
}
</style>
