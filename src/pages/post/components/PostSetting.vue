<template>
  <view class="post-setting w-full">
    <!-- 作品标签 -->
    <input class="cross-tag__input" v-model="workTag" confirm-type="done" @blur="addWorkTag" @confirm="addWorkTag" placeholder="输入作品标签" />
    <view class="tags-container">
      <view class="tag" v-for="(tag, index) in workTags" :key="index">
        <Tag :text="tag" @close-tag="removeWorkTag(index)" bg-color="brown"></Tag>
      </view>
    </view>
    <!-- 角色标签 -->
    <input class="cross-tag__input" v-model="characterTag" confirm-type="done" @blur="addCharacterTag" @confirm="addCharacterTag" :placeholder="placehodler" />
    <view class="tags-container">
      <view class="tag" v-for="(tag, index) in characterTags" :key="index">
        <Tag :text="tag" @close-tag="removeCharacterTag(index)"></Tag>
      </view>
    </view>
    <!-- 交叉标签 -->
    <input class="cross-tag__input" v-model="crossTag" confirm-type="done" @blur="addCrossTag" @confirm="addCrossTag" placeholder="输入交叉标签" />
    <view class="tags-container">
      <view class="tag" v-for="(tag, index) in crossTags" :key="index">
        <Tag :text="tag" @close-tag="removeCrossTag(index)" bg-color="pink"></Tag>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import Tag from '@/components/common/Tag/index.vue';
import { useTags } from '@/hooks/useTags';
const props = defineProps<{
  placehodler: string;
  modelValue: {
    workTags: string[];
    characterTags: string[];
    crossTags: string[];
  };
}>();

const emit = defineEmits(['update:modelValue']);

const { inputTag: workTag, tags: workTags, addTag: addWorkTag, removeTag: removeWorkTag } = useTags();
const { inputTag: characterTag, tags: characterTags, addTag: addCharacterTag, removeTag: removeCharacterTag } = useTags();
const { inputTag: crossTag, tags: crossTags, addTag: addCrossTag, removeTag: removeCrossTag } = useTags();

watch(
  [characterTags, crossTags, workTags],
  () => {
    emit('update:modelValue', {
      characterTags: characterTags.value,
      crossTags: crossTags.value,
      workTags: workTags.value,
    });
  },
  { deep: true },
);
</script>
<style lang="scss" scoped>
.post-setting {
  box-sizing: border-box;
  background-color: white;
  padding: 20rpx;
  .tags-container {
  }
  .tag {
    display: inline;

    :deep(.u-tag) {
      border-radius: 100px;
    }

    :deep(.u-tag__content) {
      display: flex;
    }
  }

  .cross-tag {
    display: flex;
    gap: 20rpx;

    &__input {
      flex: 1;
      font-size: 2;
      height: 80rpx;
    }

    &__text {
      height: 80rpx;
      line-height: 80rpx;
    }
  }
}
</style>
