<template>
    <page-wrapper show-head>
        <template #scroll>
            <good-swiper></good-swiper>
        </template>
    </page-wrapper>
</template>
<script setup lang="ts">
import PageWrapper from '@/components/container/PageContainer.vue';
import goodSwiper from './components/goodSwiper.vue';
</script>

<style lang="scss" scoped></style>