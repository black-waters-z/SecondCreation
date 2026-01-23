<template>
    <page-wrapper have_no_more>
        <go-back show-cart></go-back>
        <template #scroll>
            <good-swiper :choices="data?.choices"></good-swiper>
            <good-choice :goodInfos="data"></good-choice>
            <cafe-with-good-nav :source="data?.storeInfo"></cafe-with-good-nav>
            <comment v-for="item in data?.comments" :comment-info="item"></comment>
        </template>
        <shop-cart></shop-cart>
    </page-wrapper>
</template>
<script setup lang="ts">
import PageWrapper from '@/components/container/PageContainer.vue';
import goodSwiper from './components/goodSwiper.vue';
import goodChoice from './components/goodChoice.vue';
import CafeWithGoodNav from '@/components/shop/CafeWithGoodNav/index.vue'
import GoBack from '@/components/common/GoBack.vue';
import Comment from '@/components/shop/comment/index.vue';
import ShopCart from "@/components/base/ShopCart/index.vue";
import { onLoad } from '@dcloudio/uni-app';
import { getGoodPageInfo } from '@/api/shopApi';
import type { GoodInfos } from './type'
import { ref } from 'vue';
let data = ref<GoodInfos>({ id: 0, description: '', choices: [], comments: [] });
onLoad(async (options) => {
    data.value = await getGoodPageInfo(options?.id)
})
</script>

<style lang="scss">
page {
    height: 100%;
}
</style>