<template>
  <page-wrapper class="flex flex-1 mh-0" show-head>
    <go-back class="w-full position-sticky top-0 z-100" :title="postTitle[postType]"></go-back>
    <template #scroll>
      <write class="w-full weixin-write" v-if="postType === 'write'"></write>
      <write class="w-full weixin-write" v-if="postType === 'paint'">
        <up-upload :fileList="fileList3" @afterRead="afterRead" @delete="deletePic" name="3" multiple :maxCount="9" :previewFullImage="true"></up-upload>
      </write>
      <write class="w-full weixin-write" v-if="postType === 'video'">
        <up-upload class="video-upload" :fileList="fileList3" @afterRead="afterRead" @delete="deletePic" name="3" multiple :maxCount="1" accept="video">
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
type PostType = 'write' | 'paint' | 'video';
const postType = ref<PostType>('write');

const postTitle: Record<PostType, string> = {
  write: '发布',
  paint: '发布',
  video: '发布',
};

onLoad((options) => {
  const typeParam = options?.type as PostType;
  if (['write', 'paint', 'video'].includes(typeParam)) {
    postType.value = typeParam;
  }
});

const { fileList3, deletePic, afterRead } = usePostPicFile();

const imageUrls = computed(() => fileList3.value.map((item) => item.url).filter(Boolean));
provide('image_urls', imageUrls);
</script>

<style lang="scss">
.video-upload {
  .u-upload__wrap__preview {
    width: 100%;
  }
  .u-upload__button,
  .u-upload__wrap__preview__other {
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
