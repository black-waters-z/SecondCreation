<template>
  <view class="w-full write-container">
    <uni-forms :modelValue="formData" class="write-container__form">
      <slot></slot>
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
        <textarea maxlength="10000" v-model="formData.content" placeholder="输入文章内容"
          placeholder-class="textarea-placeholder" class="write-container__form__content w-full" />
      </uni-forms-item>
    </uni-forms>
    <view class="write-container__button">
      <SCButton @click="writeAddCraft" type="button" size="28rpx">保存到草稿箱</SCButton>
      <SCButton @click="writeSubmit" type="outline" size="28rpx">发布</SCButton>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, inject, ref, unref } from 'vue';
import SCButton from '@/components/common/SCButton/index.vue';
import SelectCollection from './SelectCollection.vue';
import { getCollectionListInPost } from "@/api/collectionApi"
import { onLoad } from '@dcloudio/uni-app';
import type { Collection } from '@/pages/post/index';
import { addDraft } from '@/api/draftApi';
import { type DraftListItem } from '@/components/icon/DraftComponent/type';
import { watch } from 'vue';
const images = inject('image_urls', [] as any);
// 从数据库获取用户建立的合集

const props = defineProps<{
  formdata: DraftListItem;
}>();

const formData = ref<DraftListItem>({
  title: '',
  subtitle: '',
  content: '',
  image_urls: [],
  created_at: '',
  updatedAt: '',
  collection: 0
})

watch(() => props.formdata, (value) => {
  formData.value = {
    ...value,
    collection: 0,
  }
}, {
  immediate: true
})

const select = ref<Collection[]>([]);
const article_id = ref<number>(0)
const draft_id = ref<number>(0)
onLoad((options) => {
  article_id.value = options?.article_id
  draft_id.value = options?.draft_id
  // 获取合集列表，并将其传到addTag页
  getCollectionListInPost().then((res) => {
    select.value = res;
  });
})

defineOptions({
  options: {
    styleIsolation: 'shared',
  },
});


const count = computed(() => {
  return formData?.value?.content?.length || 0;
});
function writeSubmit() {
  formData.value.image_urls = Array.isArray(images) ? images : unref(images);
  console.log(formData.value);
  uni.setStorage({
    key: 'articleData',
    data: formData.value,
    success: () => {
      let url = './AddTag?collection=' + formData.value.collection
      if (article_id.value) url += '&article_id=' + article_id.value;
      if (draft_id.value) url += '&draft_id=' + draft_id.value;
      uni.navigateTo({
        url: url
      });
    },
    fail: (err) => {
      console.log('本地保存文章内容失败', err);
    },
  });
}

async function writeAddCraft() {
  await addDraft(formData.value)
  uni.showToast({
    title: '保存成功',
    icon: 'success',
    duration: 2000,
    success: () => {
      uni.navigateTo({
        url: '/pages/user/index',
      });
    }
  })

}
</script>

<style lang="scss" scoped>
.write-container {
  box-sizing: border-box;
  padding: 20rpx;
  background: white;

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
    position: sticky;
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
