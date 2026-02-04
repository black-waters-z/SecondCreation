<template>
  <view class="post-comment w-100">
    <up-textarea class="post-comment__textarea" :class="{ focus_border: isFocus }" v-model="comment" placeholder="请输入内容"
      autoHeight @focus="isFocus = !isFocus" @blur="isFocus = !isFocus"></up-textarea>
    <SCButton type="button" @click="$emit('sendComment', comment)"><text>发送</text></SCButton>
  </view>
</template>

<script setup lang="ts">
import SCButton from "@/components/common/SCButton/index.vue";
import { ref } from "vue";

const comment = ref<string>();
const isFocus = ref(false);

defineEmits(["sendComment"])
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
