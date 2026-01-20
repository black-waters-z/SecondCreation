<template>
    <page-wrapper have_no_more>
        <!-- #ifdef MP-WEIXIN -->
        <head-nav class="w-full"></head-nav>
        <!-- #endif -->

        <Head class="w-full"></Head>
        <template #scroll>
            <products-wrapper></products-wrapper>
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
</script>

<style lang="scss" scoped></style>