<template>
  <view class="w-full write-container">
    <uni-forms :modelValue="formData" class="write-container__form">
      <uni-forms-item class="write-container__info flex" name="collection">
        <view class="write-container__info__addTo">
          <select-collection :collection-list="select" v-model="formData.collection"></select-collection>
        </view>
        <text>{{ count }}字</text>
      </uni-forms-item>
      <uni-forms-item name="title">
        <input type="text" v-model="formData.title" placeholder="标题" class="write-container__form__title" />
      </uni-forms-item>
      <uni-forms-item name="content">
        <textarea v-model="formData.content" placeholder="输入文章内容" placeholder-class="textarea-placeholder" class="write-container__form__content w-full" />
      </uni-forms-item>
    </uni-forms>
    <view class="write-container__button">
      <SCButton @click="writeAddCraft" type="button">保存到草稿箱</SCButton>
      <SCButton @click="writeSubmit" type="outline">发布</SCButton>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import SCButton from '@/components/common/SCButton/index.vue';
import SelectCollection from './SelectCollection.vue';

defineOptions({
  options: {
    styleIsolation: 'shared',
  },
});
const formData = reactive({
  title: '',
  content: '',
  collection: 0,
});

// 从数据库获取用户建立的合集
const select = [
  { id: 0, name: '默认合集' },
  { id: 1, name: '合集1' },
  { id: 2, name: '合集2' },
];

const count = computed(() => {
  return formData.content.length;
});
function writeSubmit() {
  console.log(formData);
  uni.setStorage({
    key: 'articleData',
    data: formData,
    success: () => {
      uni.navigateTo({
        url: './AddTag',
      });
    },
    fail: () => {
      console.log('本地保存文章内容失败');
    },
  });
}

function writeAddCraft() {
  console.log('add craft');
  window.alert('草稿保存成功');
}
</script>

<style lang="scss" scoped>
.write-container {
  box-sizing: border-box;
  padding: 20rpx;
  background-color: #f5f5f538;

  &__info {
    color: $text-muted;
    display: flex;
    justify-content: flex-end;

    &__addTo {
      flex: 1;
    }
  }

  &__form {
    &__content {
      height: 100vh;
    }

    &__title {
      font-size: 40rpx;
      font-weight: 700;
    }
  }

  &__button {
    z-index: 100;
    border: none;
    position: fixed;
    width: 100%;
    justify-content: center;
    left: 0;
    bottom: 40rpx;
    box-sizing: border-box;
    padding: 40rpx;
    display: flex;
  }
  :deep(.uni-forms-item__content) {
    display: flex !important;
  }

  :deep(.uni-forms-item) {
    margin-bottom: 0;
    margin-top: 11rpx;
  }
}
</style>
