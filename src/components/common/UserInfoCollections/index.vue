<template>
    <view class="user-info-collections">
        <collection v-for="(item, idx) in collectionList" :key="idx" :collection="item"></collection>
    </view>
</template>

<script setup lang="ts">
import collection from './collection.vue';
import type { CollectionData } from "./type"
defineProps<{ collectionList: CollectionData[] }>()
</script>