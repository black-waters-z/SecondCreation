<template>
    <view class="draft-componnet">
        <Draft v-for="(item, idx) in drafts" :key="idx" :draft="item"></Draft>
    </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import Draft from './Draft.vue';
import { getDraftArticleList } from '@/api/draftApi';
import { type DraftList } from './type';
import { ref } from 'vue';
const drafts = ref<DraftList>([]);
onLoad(async () => {
    // 开始查草稿
    drafts.value = await getDraftArticleList(1, 10)
})

</script>

<style lang="scss" scoped></style>