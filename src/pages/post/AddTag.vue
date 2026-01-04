<template>
  <view class="w-full add-tag">
    <go-back title="发布文章"></go-back>
    <post-setting v-model="workTags" placehodler="输入角色标签"></post-setting>
    <view class="w-full bg-white add-tag-select">
      <select-collection :collection-list="collectionList" v-model="collection"></select-collection>
    </view>
    <view class="write-container__button">
      <SCButton @click="submit" type="button">发布</SCButton>
    </view>
  </view>
</template>

<script setup lang="ts">
import GoBack from '@/components/common/GoBack.vue';
import PostSetting from './components/PostSetting.vue';
import SCButton from '@/components/common/SCButton/index.vue';
import SelectCollection from './components/SelectCollection.vue';

import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
const articleData = ref<any>({});

const workTags = ref({
  workTags: [],
  characterTags: [],
  crossTags: [],
});

// 从数据库中获取id=id的用户创建的文章合集，先用合集列表占位
/**
 * 这里之后插入代码
 */
const collection = ref<number>(0);
const collectionList = [
  { id: 0, name: '默认合集' },
  { id: 1, name: '合集1' },
  { id: 2, name: '合集2' },
];

onLoad(() => {
  uni.getStorage({
    key: 'articleData',
    success: (res) => {
      articleData.value = res.data;
      collection.value = articleData.value.collection || 0;
      console.log('getArticleData:', articleData.value);
    },
    fail: () => {
      console.error('Failed to retrieve article data.');
    },
  });
});

function submit() {
  delete articleData.value.collection;
  const result = {
    ...articleData.value,
    collection: collectionList[collection.value],
    tags: {
      ...workTags.value,
    },
  };
  console.log(result);
}
</script>

<style lang="scss">
.add-tag {
  .write-container__button {
    width: 100%;
    border: none;
    left: 0;
    justify-content: flex-end;
    bottom: 40rpx;
    box-sizing: border-box;
    padding: 40rpx;
    display: flex;
  }

  :deep(.add-tag-select .select-collection-container) {
    color: $text-muted;
    height: 120rpx;
    width: 100%;
    display: flex;
    background-color: white;
    align-items: center;
  }
}
</style>
