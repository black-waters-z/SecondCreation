<template>
    <page-wrapper have_no_more>
        <go-back show-cart></go-back>
        <template #scroll>
            <good-swiper></good-swiper>
            <good-choice></good-choice>
            <cafe-with-good-nav></cafe-with-good-nav>
            <comment></comment>
        </template>
    </page-wrapper>
</template>
<script setup lang="ts">
import PageWrapper from '@/components/container/PageContainer.vue';
import goodSwiper from './components/goodSwiper.vue';
import goodChoice from './components/goodChoice.vue';
import CafeWithGoodNav from '@/components/shop/CafeWithGoodNav/index.vue'
import GoBack from '@/components/common/GoBack.vue';
import Comment from '@/components/shop/comment/index.vue';
</script>

<style lang="scss">
page {
    height: 100%;
}
</style>