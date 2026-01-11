<template>
  <view class="w-full flex">
    <view class="select-collection-container">
      <picker class="select-collection-container__picker" :range="nameList" range-key="" :value="index" @change="bindPickerChange">
        <view class="flex item-center justify-center">
          <text class="select-collection-container__picker__text">
            <slot name="filterName"></slot>
          </text>
          <view class="uni-input select-collection-container__picker__text">{{ collectionList?.[index].name }}</view>
          <text class="select-collection-container__picker__text">
            <slot name="filterEnd"></slot>
          </text>
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
  if (!props.collectionList) return ['NotFound'];
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

  &__picker {
    &__text {
      font-size: 30rpx;
    }
  }
}
</style>
