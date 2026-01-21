<template>
    <page-wrapper>
        <go-back show-cart></go-back>
        <template #scroll>
            <good-swiper></good-swiper>
            <good-choice></good-choice>
            <cafe-with-good-nav></cafe-with-good-nav>
        </template>
    </page-wrapper>
</template>
<script setup lang="ts">
import PageWrapper from '@/components/container/PageContainer.vue';
import goodSwiper from './components/goodSwiper.vue';
import goodChoice from './components/goodChoice.vue';
import CafeWithGoodNav from '@/components/shop/CafeWithGoodNav/index.vue'
import GoBack from '@/components/common/GoBack.vue';
</script>

<style lang="scss">
page {
    height: 100%;
}
</style>