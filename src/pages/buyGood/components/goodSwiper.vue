<template>
    <view class="good-swiper">
        <uni-swiper-dot :info="info" :current="current" field="content" :mode="mode">
            <swiper class="good-swiper__swiper-box" @change="change">
                <swiper-item v-for="(item, index) in info" :key="index">
                    <view class="swiper-item">
                        <image class="w-full swiper-item__image"
                            src="https://raw.githubusercontent.com/black-waters-z/MyPictiureStore/refs/heads/main/pailideTest1.png"
                            mode="aspectFill">
                        </image>
                    </view>
                </swiper-item>
            </swiper>
        </uni-swiper-dot>
    </view>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const info = [{
    content: '徽章组'
}, {
    content: '色纸'
}, {
    content: '拍立得'
}]
const current = ref(0)
const mode = 'nav'

function change(e) {
    current.value = e.detail.current
}
</script>

<style lang="scss" scoped>
.good-swiper {
    width: 700rpx;
    height: 400rpx;
    margin: 20rpx auto;

    .good-swiper__swiper-box {
        height: 400rpx;

        .swiper-item {

            &__image {
                border-radius: 15px;
            }
        }
    }

    ::v-deep .uni-swiper__dots-nav-item {
        background-color: #28272775;
        border-radius: 30rpx;
        padding: 10rpx 30rpx;
    }

    ::v-deep .uni-swiper__dots-box {
        background: none;
        display: flex;
        justify-content: flex-end;
    }
}
</style>