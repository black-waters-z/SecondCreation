<template>
  <view class="post-comment w-100">
    <up-textarea class="post-comment__textarea" :class="{ focus_border: isFocus }" v-model="comment" placeholder="请输入内容"
      autoHeight @focus="isFocus = !isFocus" @blur="isFocus = !isFocus"></up-textarea>
    <SCButton type="button" @click="sendComment"><text>发送</text></SCButton>
  </view>
</template>

<script setup lang="ts">
import SCButton from "@/components/common/SCButton/index.vue";
import { ref, watch } from "vue";
const props = defineProps<{ commentToward: { content: string, parent_id?: number, parent_name?: string, article_id: number } }>()
const emit = defineEmits(['sendComment', 'update:commentToward'])
const comment = ref<string>();
const isFocus = ref(false);

function sendComment() {
  emit('sendComment', comment.value)
  comment.value = ''
}

watch(
  () => props.commentToward.parent_name,
  (newParentName) => {
    if (newParentName) {
      comment.value = `@${newParentName} ${comment.value || ''}` + `${comment.value || ''}`;
    }
  },
  { immediate: true }
);

watch(() => comment.value, (newValue) => {
  if (comment.value && props.commentToward.parent_name && !comment.value.includes(props.commentToward.parent_name)) {
    emit('update:commentToward', { content: newValue, article_id: props.commentToward.article_id })
  }
})
</script>

<style lang="scss" scoped>
.post-comment {
  box-sizing: border-box;
  padding: 10px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__textarea {
    width: 95%;
    margin-bottom: 10px;
  }

  .focus_border {
    border-color: $pink-color !important;
  }

  ::v-deep .button-bt {
    font-size: 26rpx;
  }
}
</style>
