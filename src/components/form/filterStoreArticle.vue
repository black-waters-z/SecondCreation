<template>
    <form class="filter-store-article">
        <view class="filter-store-article__title">筛选</view>
        分类：<checkbox-group>
            <label>
                <checkbox value="cb" :checked="true" />选中
            </label>
            <label>
                <checkbox value="cb" />未选中
            </label>
        </checkbox-group>
        <view class="uni-list">
            <view class="uni-list-cell">
                <view class="uni-list-cell-left">
                    当前选择
                </view>
                <view class="uni-list-cell-db">
                    <picker mode="date" fields="month" :value="date" :start="startDate" :end="endDate"
                        @change="bindDateChange">
                        <view class="uni-input">{{ date }}</view>
                    </picker>
                </view>
            </view>
        </view>
        添加筛选tag：
        <SCButton type="button">filter!</SCButton>
    </form>
</template>

<script setup lang="ts">
import SCButton from '@/components/common/SCButton/index.vue'
</script>

<style lang="scss" scoped></style>