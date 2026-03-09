<template>
    <view class="filter-store-article">
        <uni-section title="分类" type="line"></uni-section>
        <checkbox-group @change="checkedIcon">
            <label class="filter-store-article__label">
                <checkbox value="write" :checked="true" />文字
            </label>
            <label class="filter-store-article__label">
                <checkbox value="paint" />图片
            </label>
            <label class="filter-store-article__label">
                <checkbox value="video" />视频
            </label>
        </checkbox-group>
        <uni-section title="搜索关键词" type="line"></uni-section>
        <uni-easyinput v-model="keyword" placeholder="输入搜索关键词" @iconClick="iconClick">
        </uni-easyinput>
        <uni-section :title="'搜索日期'" type="line"></uni-section>
        <view class="example-body">
            <uni-datetime-picker v-model="range" type="daterange" @maskClick="maskClick" />
        </view>
        <uni-section title="添加搜索tag" type="line"></uni-section>
        <uni-easyinput suffixIcon="plusempty" v-model="tagInput" placeholder="左侧图标" @iconClick="iconClick">
        </uni-easyinput>
        <view class="tag-input-all-container">
            <Tag v-for="(item, idx) in tagInputAll" :key="idx" :text="item" @close-tag="deleteTag(idx)"
                bgColor="#f9a8d4">
            </Tag>
        </view>
        <view class="w-full flex justify-center">
            <SCButton type="button" class="filter-store-article__button" @click="startFilter" color="$pink-400">确认
            </SCButton>
        </view>
    </view>
</template>

<script setup lang="ts">
import SCButton from '@/components/common/SCButton/index.vue'
import Tag from '@/components/common/Tag/index.vue'
import { ref } from 'vue';

const emit = defineEmits([
    'startFilter'
])

const range = ref(['2026-01-1', '2026-01-28'])
const tagInput = ref<string>('')
const tagInputAll = ref<string[]>([])
const checkedValue = ref(['write'])
const keyword = ref<string>('')
function maskClick(e) {
    console.log('maskClick事件:', e);
}

function iconClick() {
    if (!tagInput.value) return
    tagInputAll.value = [...tagInputAll.value, tagInput.value]
    tagInput.value = ''
}

function checkedIcon(e) {
    checkedValue.value = e.detail.value
}

function deleteTag(idx: number) {
    tagInputAll.value.splice(idx, 1)
}

function startFilter() {
    emit('startFilter', {
        article_style: checkedValue.value,
        keyword: keyword.value,
        time_range: range.value,
        tag_names: tagInputAll.value
    })
    // 筛选干脆根据每个表格不同在自己表格里筛选就好，传递回去只是通知对方关闭筛选界面
}
</script>

<style lang="scss" scoped>
.filter-store-article {
    &__label {
        font-size: 28rpx;
        margin-right: 20rpx;
        color: #333;
        letter-spacing: 2rpx;
    }

    &__button {
        font-size: 28rpx;
        margin-top: 100rpx;
        margin-bottom: 60rpx;
    }

    ::v-deep .uni-section .uni-section-header__decoration {
        background-color: $pink-400;
    }

    ::v-deep .uni-checkbox-input svg {
        color: $pink-300;

        path {
            fill: $pink-400;
        }
    }
}
</style>