<template>
    <view class="user-info-collections">
        <view class="user-info-colletions__icon" v-if="isMe">
            <uni-icons type="plus" size="26" @click="togglePop"></uni-icons>
        </view>
        <collection v-for="(item, idx) in collectionLists" :key="idx" :collection="item"></collection>
        <pop-wrapper v-model:pop-show="popShow">
            <collection-add-form @submit="submit"></collection-add-form>
        </pop-wrapper>
    </view>
</template>

<script setup lang="ts">


defineOptions({
  options: {
    virtualHost: true,
  },
});import collection from './collection.vue';
import PopWrapper from "@/components/base/PopWrapper/index.vue"
import type { CollectionData } from "./type"
import CollectionAddForm from '@/components/form/CollectionAddForm.vue';
import { ref } from 'vue';
import { watch } from 'vue';
const props = defineProps<{ collectionList: CollectionData[], isMe: boolean }>()
const collectionLists = ref(props.collectionList)

watch(() => props.collectionList, (newVal) => {
    collectionLists.value = newVal
})

const popShow = ref(false)
function togglePop() {
    popShow.value = !popShow.value
}

function submit(collection: CollectionData) {
    popShow.value = false
    collectionLists.value.push(collection)
}
</script>

<style lang="scss" scoped>
.user-info-collections {

    .user-info-colletions__icon {
        padding: 0 20rpx;
    }
}

@media screen and (min-width:600px) {
    .user-info-collections {
        margin-top: 20rpx;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 20rpx;
    }
}
</style>