<template>
    <view class="good-swiper">
        <uni-swiper-dot v-if="choices.length" :info="info" :current="current" field="content" :mode="mode">
            <swiper class="good-swiper__swiper-box" @change="change">
                <swiper-item v-for="(item, index) in choices" :key="index">
                    <view class="swiper-item">
                        <image class="w-full swiper-item__image" :src="item.swiperImg" mode="aspectFill">
                        </image>
                    </view>
                </swiper-item>
            </swiper>
        </uni-swiper-dot>
    </view>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import type { goodChoice } from '../type'
const props = withDefaults(defineProps<{ choices: goodChoice[] }>(), {
    choices: () => []
});
const info = computed(() => {
    if (!props.choices) return []
    return props.choices.map((item) => ({
        content: item.name
    }))
})
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
