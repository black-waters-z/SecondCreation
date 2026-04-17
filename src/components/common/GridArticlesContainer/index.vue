<template>
    <!-- styles可以传入grid的列数 -->
    <view class="grid-articles-container">
        <water-fall v-if="!type" :water-fall-col-num="isMobile ? 2 : 5" :article-lists="articleList"
            ref="waterfall"></water-fall>
        <Grid :article-list="articleList" v-if="type === 'grid'"></Grid>
    </view>
</template>

<script lang="ts" setup>
import WaterFall from '../WaterFall.vue';
import type { Article } from '@/pages/tagPage/type'
import { isMobile } from "@/utils/index"
import Grid from "./Grid.vue"
import { ref } from 'vue';

const waterfall = ref<InstanceType<typeof WaterFall> | null>(null);
defineProps<{
    articleList: Article[] | undefined;
    type?: 'grid' | null;
}>();

function reset() {
    waterfall.value?.resetColumns();
}

defineExpose({ reset })

defineOptions({
  options: {
    virtualHost: true,
  },
});
</script>

<style scoped lang="scss"></style>
