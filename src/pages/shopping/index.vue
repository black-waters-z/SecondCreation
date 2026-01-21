<template>
    <page-wrapper have_no_more>
        <!-- #ifdef MP-WEIXIN -->
        <head-nav class="w-full"></head-nav>
        <!-- #endif -->

        <Head class="w-full" v-model="headChoose"></Head>
        <template #scroll>
            <products-wrapper v-if="headChoose == shopTab.paint"></products-wrapper>
            <products-wrapper v-if="headChoose == shopTab.write"></products-wrapper>
            <products-wrapper v-if="headChoose == shopTab.toy"></products-wrapper>
            <comments-wrapper v-if="headChoose == shopTab.comment"></comments-wrapper>
        </template>
        <post-sheet class="w-full"></post-sheet>
        <post-sheet-show></post-sheet-show>
    </page-wrapper>
</template>

<script setup lang="ts">
import PageWrapper from "@/components/container/PageContainer.vue"
import Head from "./components/Head.vue";
import HeadNav from "@/components/common/HeadNav.vue";
import ProductsWrapper from "./components/ProductsWrapper.vue";
import PostSheet from '@/components/common/PostSheet/index.vue';
import PostSheetShow from '@/components/common/PostSheet/PostSheetShow.vue';
import { shopTab } from "./type";
import { ref, } from "vue";
import CommentsWrapper from "./components/CommentsWrapper.vue";
const headChoose = ref(shopTab.paint)

</script>

<style lang="scss" scoped></style>