<template>
  <view class="filter-container">
    <!-- 筛选条件 -->
    <text
      v-for="(value, index) in filters"
      @click="handleFilter(index)"
      :class="{ filter: true, active: index === modelValue }"
      >{{ value }}</text
    >
  </view>
</template>

<script setup lang="ts">
const filters = ["最热", "本月最热", "本周最热", "最新"];
const props = withDefaults(defineProps<{ modelValue?: number }>(), {
  modelValue: 0,
});
const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();

const handleFilter = (idx: number) => {
  if (idx != props.modelValue) {
    emit("update:modelValue", idx);
  }
};
</script>

<style lang="scss" scoped>
$grey-background-color: rgb(248, 248, 248);

.filter-container {
  width: 100vw;
  z-index: 2000;
  position: fixed;
  left: 0;
  top: 70rpx;
  height: 70rpx;
  font-size: 30rpx;
  background-color: white;
  display: flex;
  justify-content: center;
  gap: 50rpx;

  .filter {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
  }

  .active {
    color: palevioletred;
    font-weight: 700;
    border-bottom: 3px solid palevioletred;
  }
}
</style>
