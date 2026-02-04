<template>
  <!-- 这个改成tag总结 -->
  <page-wrapper class="w-full tag-nav letter-spacing-4" show-head>
    <go-back class="w-full"></go-back>
    <template #scroll>
      <view class="w-full tag-nav__scroll" v-for="(item, key) in tagList" :key="key">
        <IntroductionNav v-show="item" class="tag-nav__introduction" :navigator-href="`/pages/tagNav/zone?type=${key}`">
          {{ introduction[key] }}
        </IntroductionNav>
        <tag-container :tag-list="item"></tag-container>
      </view>
    </template>
  </page-wrapper>
</template>

<script setup lang="ts">
import PageWrapper from '@/components/container/PageContainer.vue';
import TagContainer from './components/tagContainer.vue';
import IntroductionNav from '@/components/base/IntroductionNav/index.vue';
import GoBack from '@/components/common/GoBack.vue';
import { get } from "@/utils/request"
import { computed, ref } from 'vue';
import type { Tag as TagType } from './type';
import { introduction } from './type';
import { onLoad } from '@dcloudio/uni-app';

const tagListAll = ref<TagType[]>([
]);

const tagList = computed(() => {
  let lst: Record<string, TagType[]> = {}
  lst['work'] = tagListAll.value.filter(item => item.type === 'work')
  lst['character'] = tagListAll.value.filter(item => item.type === 'character')
  lst['cross'] = tagListAll.value.filter(item => item.type === 'cross')
  return lst
})

onLoad(async () => {
  const res = await get(`/tags/?page=1&page_size=100`)
  tagListAll.value = res?.items
  console.log(res?.items)
})
</script>

<style lang="scss">
page {
  height: 100vh;
}

.tag-nav-one {
  margin: 6rpx 0;
}

.tag-nav {
  &__scroll {
    box-sizing: border-box;
    padding: 0 20px;
  }

  &__introduction {
    margin: 20px 0;
  }

  .introduction-nav__text {
    font-size: 33rpx;
  }
}
</style>
