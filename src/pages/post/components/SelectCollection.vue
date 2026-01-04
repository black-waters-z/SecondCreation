<template>
  <view class="w-full flex">
    <view class="select-collection-container">
      <picker class="select-collection-container__picker" :range="nameList" range-key="" :value="index" @change="bindPickerChange">
        <view class="flex">
          <text>加入合集：</text>
          <view class="uni-input">{{ collectionList[modelValue].name || collectionList[index].name }}</view>
        </view>
      </picker>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

interface collection {
  id: number;
  name: string;
}

const props = defineProps<{
  collectionList: collection[];
  modelValue: number;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
}>();
const nameList = computed(() => {
  return props.collectionList.map((item) => item.name);
});

const index = ref(0);

function bindPickerChange(e: any) {
  index.value = e.detail.value;
  emit('update:modelValue', index.value);
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
