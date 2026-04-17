<template>
    <view class="collection-add-form">
        <up-upload :fileList="fileList3" @afterRead="afterRead" @delete="deletePic" name="3" multiple :maxCount="1"
            :previewFullImage="true"></up-upload>
        <view class="collection-add-form__info">
            <text class="collection-add-form__text">合集名：</text><input class="collection-add-form__input" type="text"
                placeholder="输入合集名称" v-model="data.name">
            <text class="collection-add-form__text">合集简介：</text><input class="collection-add-form__input" type="text"
                placeholder="输入合集简介" v-model="data.description">
            <SCButton type="button" :size="'26rpx'" @click="submit" style="margin-top: 40rpx;margin-left: auto;">新建
            </SCButton>
        </view>
    </view>
</template>

<script setup lang="ts">


defineOptions({
  options: {
    virtualHost: true,
  },
});import { usePostPicFile } from '@/hooks/usePostFile';
import { type CreateCollection, postCollection } from '@/api/collectionApi';
import { computed, ref } from 'vue';
import SCButton from "@/components/common/SCButton/index.vue"

const emit = defineEmits(['submit'])
const { fileList3, deletePic, afterRead } = usePostPicFile();
const imageUrl = computed(() => {
    let list: string = '';
    if (fileList3.value) {
        list = fileList3.value[0]?.url
    }
    return list;
});

const data = ref<CreateCollection>({
    name: '',
    description: '',
})

async function submit() {
    if (data.value?.name) {
        const id = await postCollection({
            name: data.value.name,
            description: data.value.description,
            image_url: imageUrl.value
        })
        const appendData = {
            id: id,
            name: data.value.name,
            description: data.value.description,
            image_url: imageUrl.value
        }
        emit('submit', appendData)
        return;
    }
    uni.showToast({
        title: '请填写完全信息',
        icon: 'error',
        duration: 2000
    })

}
</script>

<style lang="scss" scoped>
.collection-add-form {
    box-sizing: border-box;
    padding: 40rpx;
    display: flex;
    flex-direction: row;
    gap: 10px;
    font-size: 28rpx;

    &__input {
        padding: 20rpx 0;
        font-size: 26rpx;
    }

    &__info {
        display: flex;
        flex-direction: column;
        gap: 10rpx;
    }

    &__text {
        letter-spacing: 2rpx;
        margin-top: 20rpx;
    }

}
</style>