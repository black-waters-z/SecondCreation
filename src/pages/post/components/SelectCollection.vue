<template>
  <view class="w-full flex">
    <view class="select-collection-container">
      <picker
        class="select-collection-container__picker"
        :range="collectionList"
        range-key=""
        :value="index"
        @change="bindPickerChange"
      >
        <view class="flex">
          <text>加入合集：</text>
          <view class="uni-input">{{ collectionList[index] }}</view>
        </view>
      </picker>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  collectionList: string[];
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const index = ref(0);

function bindPickerChange(e: any) {
  index.value = e.detail.value;
  emit("update:modelValue", props.collectionList[index.value]);
}
</script>

<style lang="scss" scoped>
.select-collection-container {
  display: flex;
  background-color: $border-color;
  border-radius: 100px;
  box-sizing: border-box;
  padding: {
    left: 20rpx;
    right: 20rpx;
    top: 5rpx;
    bottom: 5rpx;
  }
}
</style>
