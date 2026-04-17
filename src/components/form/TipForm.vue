<template>
    <view class="tip-form-container w-full">
        <view class="tip-form-container__title">钱包：431 积分</view>
        <view class="tip-form">
            <view class="tip-form__item" v-for="(item, idx) in tipList" :key="idx"
                :class="{ 'tip-form__item-active': item_active === idx }" @click="item_active = idx">
                {{ item.name }}
            </view>
        </view>
        <view class="tip-form__rank">排行榜
            <ClickIcon :size="16" :type="['right']" @click="rank_pop_show = !rank_pop_show"></ClickIcon>
        </view>
        <view class="tip-form__confirm">
            <SCButton type="button" size="26rpx">确认赠送
            </SCButton>
        </view>
    </view>
    <pop-wrapper v-model:pop-show="rank_pop_show">12aaa</pop-wrapper>
</template>

<script setup lang="ts">


defineOptions({
  options: {
    virtualHost: true,
  },
});import ClickIcon from "@/components/base/ClickIcon/index.vue"
import SCButton from "@/components/common/SCButton/index.vue"
import { ref } from "vue"
import PopWrapper from "@/components/base/PopWrapper/index.vue"
const item_active = ref<number>(0)
const rank_pop_show = ref<boolean>(false)
interface Tip {
    id: number,
    name: string,
    point: number
}
const tipList = [{
    id: 1,
    name: "10积分",
    point: 10,
},
{
    id: 2,
    name: "20积分",
    point: 20,
},
{
    id: 3,
    name: "50积分",
    point: 50,
},
{
    id: 4,
    name: "100积分",
    point: 100,
},

]
</script>

<style lang="scss" scoped>
.tip-form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    padding: 10rpx;
    position: relative;

    &__title {
        font-size: 26rpx;
        width: 100%;
        box-sizing: border-box;
        padding: 20rpx;
        letter-spacing: 4rpx;
    }
}

.tip-form {
    width: 100%;
    display: grid;
    box-sizing: border-box;
    grid-template-columns: 1fr 1fr 1fr;

    &__item {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100rpx;
        box-sizing: border-box;
        border-radius: 15rpx;
        margin: 10rpx 20rpx;
        background-color: $uni-bg-color-grey;
        font-size: 26rpx;

        &-active {
            background-color: $pink-300;
            color: #fff;
        }

    }

    &__rank {
        width: 100%;
        box-sizing: border-box;
        padding: 10rpx 30rpx;
        display: flex;
        justify-content: space-between;
        letter-spacing: 4rpx;
        border-radius: 100rpx;
        font-size: 26rpx;
        margin: 20rpx 0;
    }
}
</style>