<template>
    <view class="form-base">
        <view class="form-base__item">
            <uni-section :title="source.name" type="line">
            </uni-section>
            <uni-easyinput v-model="value" type="text" :placeholder="source.placeholder"
                v-if="source.type === 'text'" />
            <up-upload :fileList="fileList3" @afterRead="afterRead" @delete="deletePic" name="3"
                :previewFullImage="true" v-if="source.type === 'file'" multiple :maxCount="1"></up-upload>
        </view>
    </view>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { usePostPicFile } from '@/hooks/usePostFile';

import type { FormBaseType, FormValue } from './type';
const props = defineProps<{
    source: FormBaseType;
}>()

const { fileList3, deletePic, afterRead } = usePostPicFile();


const emit = defineEmits<{
    (e: 'update:source', value: FormValue): void;
}>()

const value = computed({
    get() {
        return props.source.value
    },
    set(val) {
        emit('update:source', { ...props.source, value: val })
    }
})

watch(fileList3.value, (val) => {
    value.value = val
})

</script>