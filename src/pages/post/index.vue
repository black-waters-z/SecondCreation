<template>
  <page-wrapper class="flex flex-1 mh-0">
    <go-back class="w-full position-sticky top-0 z-100">返回</go-back>
    <template #scroll>
      <write class="w-full weixin-write" v-if="postType === 'write' && (!article_id || formData)" :formdata="formData">
      </write>
      <write class="w-full weixin-write" v-if="postType === 'paint' && (!article_id || formData)" :formdata="formData">
        <up-upload :fileList="fileList3" @afterRead="afterRead" @delete="deletePic" name="3" multiple :maxCount="9"
          :previewFullImage="true"></up-upload>
      </write>
      <write class="w-full weixin-write" v-if="postType === 'video' && (!article_id || formData)" :formdata="formData">
        <up-upload class="video-upload" :fileList="fileList3" @afterRead="afterRead" @delete="deletePic" name="3"
          multiple :maxCount="1" accept="video">
          <!-- <video src=""></video> -->
        </up-upload>
      </write>
    </template>
  </page-wrapper>
</template>

<script setup lang="ts">
import GoBack from '@/components/common/GoBack.vue';
import Write from './components/Write.vue';
import PageWrapper from '@/components/container/PageContainer.vue';
import { onLoad } from '@dcloudio/uni-app';
import { computed, provide, ref } from 'vue';
import { usePostPicFile } from '@/hooks/usePostFile';
import { getArticleById } from '@/api/articleApi';
import type { Article } from '@/pages/tagPage/type';
type PostType = 'write' | 'paint' | 'video';
const postType = ref<PostType>('write');

const formData = ref<Article>();
const article_id = ref<number>();
onLoad((options) => {
  // 假如传过来的地址有id号，首先查是否是该用户的文章，再获取用户的文章进行编辑
  if (options?.article_id) {
    // 查文章
    article_id.value = options.article_id
    getArticleById(options.article_id).then((res) => {
      // 判断用户有无权限编辑此文章
      formData.value = res.article
    });
  }
  const typeParam = options?.type as PostType;
  if (['write', 'paint', 'video'].includes(typeParam)) {
    postType.value = typeParam;
  }

});

const { fileList3, deletePic, afterRead } = usePostPicFile();

const imageUrls = computed(() => {
  let list: string[] = [];
  fileList3.value.map((item) => {
    list.push(item.url);
    if (item.coverUrl) {
      list.push(item?.coverUrl)
    }
  }).filter(Boolean)
  return list;
});

provide('image_urls', imageUrls);


</script>

<style lang="scss">
page {
  height: 100%;
}

.video-upload {
  .u-upload__wrap__preview {
    width: 100%;
  }

  ::v-deep .u-upload__button {
    width: 100% !important;
    height: 190px !important;
    margin-right: 0;
    border-radius: 8px;
  }

  ::v-deep .u-upload__wrap__preview__other {
    width: 100% !important;
    height: 190px !important;
    margin-right: 0;
    border-radius: 8px;
  }

  .u-upload__wrap__preview__other {
    background-color: black;

    &:first-child::after {
      content: '视频上传成功';
      font-size: 16px;
      color: #d3d4d6;
    }
  }

  .u-upload__button {
    &:first-child::after {
      content: '上传视频';
      font-size: 16px;
      color: #d3d4d6;
    }
  }

  .u-popup__content {
    display: none;
  }
}
</style>
