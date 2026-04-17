<template>
    <page-wrapper have_no_more>
        <Head class="w-full" v-model="headChoose"></Head>
        <template #scroll>
            <products-wrapper :info="goods" v-show="headChoose === shopTab.paint"></products-wrapper>
            <products-wrapper :info="goods" v-show="headChoose === shopTab.write"></products-wrapper>
            <products-wrapper :info="goods" v-show="headChoose === shopTab.toy"></products-wrapper>
            <comments-wrapper :source="comments" v-show="headChoose === shopTab.comment"></comments-wrapper>
        </template>
        <shop-cart></shop-cart>
        <post-sheet class="w-full"></post-sheet>
        <post-sheet-show></post-sheet-show>
    </page-wrapper>
</template>

<script setup lang="ts">
import PageWrapper from "@/components/container/PageContainer.vue"
import Head from "./components/Head.vue";
import ProductsWrapper from "./components/ProductsWrapper.vue";
import PostSheet from '@/components/common/PostSheet/index.vue';
import PostSheetShow from '@/components/common/PostSheet/PostSheetShow.vue';
import ShopCart from "@/components/base/ShopCart/index.vue";
import { shopTab } from "./type";
import type { goodInfo, commentsInfo } from "./type";
import { ref, } from "vue";
import CommentsWrapper from "./components/CommentsWrapper.vue";
import { onLoad } from "@dcloudio/uni-app";
import { getGoodsInfo, getGoodsComments } from "@/api/shopApi"
const headChoose = ref(shopTab.paint)
let goods = ref<goodInfo[]>([])
let comments = ref<commentsInfo>({ comments: [] })
// 之后给接口加分类paint write toy
onLoad(async () => {
    await getGoodsInfo(1, 10).then(res => {
        goods.value = res
    })
    await getGoodsComments(1).then(res => {
        comments.value.comments = res
    })
})
</script>

<style lang="scss" scoped></style>