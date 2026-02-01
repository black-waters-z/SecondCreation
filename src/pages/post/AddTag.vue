<template>
  <page-wrapper show-head class="add-tag">
    <go-back class="w-full" title="发布文章"></go-back>
    <post-setting class="w-full" v-model="workTags" placehodler="输入角色标签"></post-setting>
    <view class="w-full bg-white add-tag-select">
      <select-collection :collection-list="collectionList" v-model="collection"></select-collection>
    </view>
    <view class="write-container__button">
      <SCButton @click="submit" type="button">发布</SCButton>
    </view>
  </page-wrapper>
</template>

<script setup lang="ts">
import GoBack from '@/components/common/GoBack.vue';
import PostSetting from './components/PostSetting.vue';
import SCButton from '@/components/common/SCButton/index.vue';
import SelectCollection from './components/SelectCollection.vue';
import PageWrapper from '@/components/container/PageContainer.vue';
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app'
import type { Collection } from '@/pages/post/index';;
import { post } from '@/utils/request';
import { getCollectionListInPost } from '@/api/collectionApi';
const articleData = ref<any>({});

defineOptions({
  options: {
    styleIsolation: 'shared',
  },
});

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
const collectionList = ref<Collection[]>([]);

onLoad((options) => {
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
  getCollectionListInPost().then((res) => {
    collectionList.value = res;
  });
  collection.value = Number(options?.collection)
});

async function submit() {
  delete articleData.value.collection;
  const result = {
    data: {
      ...articleData.value,
      collection: collectionList.value[collection.value],
      tags: {
        ...workTags.value,
      },
    },
  };

  // 开始插入或者查询tag的id
  const tagResult = await post('/tags/articleTags', result.data.tags);
  delete result.data.tags;
  const postResult = await post('/articles', { ...result.data, tag_ids: tagResult.tag_ids });
  console.log('postResult', postResult);

  if (postResult) {
    uni.showToast({
      title: '发布成功',
      icon: 'success', // 也可以是 'loading' 或 'none'
      duration: 2000, // 显示时长，单位毫秒
    });
    setTimeout(() => {
      uni.switchTab({ url: '/pages/user/index' });
    }, 2000);
  }
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
    gap: 10rpx;
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
