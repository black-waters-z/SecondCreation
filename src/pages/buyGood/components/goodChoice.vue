<template>
    <view class="good-choice">
        <view class="good-choice__description" :class="{ expanded: isExpanded }">
            <rich-text class="good-choice__description--text" :nodes="richTextNodes">
            </rich-text>
            <button class="good-choice__description--button" @click="openRichText">{{ isExpanded ? '收起' : '展开'
                }}</button>
        </view>

        <view class="w-full good-choice__container">
            <view v-for="(item, idx) in goodInfos?.choices" class="good-choice__item" :key="idx">
                <!-- ban: 商品库存为0禁用按钮 -->
                <view @click="chooseGood(idx)" :class="{ 'active': activeIndex === idx, 'ban': false }"
                    class="good-choice__tag">
                    <text>{{ item.name }}</text>
                </view>
            </view>
        </view>
        <view class="good-choice__number-box">
            <uni-number-box :min="1" :max="9" :value="1" />
            <text class="good-choice__number-box--left">余量{{ goodInfos?.choices?.[activeIndex]?.stock }}</text>
            <text class="good-choice__number-box--price">￥{{ goodInfos?.choices?.[activeIndex]?.price }}</text>
        </view>

        <view class="good-choice__good-wrapper">
            <SCButton class="good-choice__good-wrapper--button" type="outline">加入购物车</SCButton>
            <SCButton class="good-choice__good-wrapper--button" type="button">立即购买</SCButton>
        </view>
    </view>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import type { GoodInfos } from '../type';
import SCButton from '@/components/common/SCButton/index.vue'
import { richTextNodes } from '../type'
const props = defineProps<{ goodInfos: GoodInfos }>()
const activeIndex = ref<number>(0)
// 这里应该有多选
const isExpanded = ref(false)
function chooseGood(idx: number) {
    activeIndex.value = idx;
}

function openRichText() {
    isExpanded.value = !isExpanded.value;
}

const choices = computed(() => {
    return props.goodInfos.choices.map(item => {
        return item.name;
    })
})


</script>
<style lang="scss" scoped>
.good-choice {
    display: flex;
    flex-direction: column;
    gap: 20rpx;
    box-sizing: border-box;
    padding: 10rpx 30rpx;
    background-color: white;

    &__description {
        position: relative;

        &.expanded {
            .good-choice__description--text {
                max-height: none;
            }
        }

        &--text {
            display: block;
            max-height: 440rpx;
            overflow: hidden;
            position: relative;

            &::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 60rpx;
                background: linear-gradient(to bottom, transparent 0%, white 70%);
                pointer-events: none;
                /* 确保不影响点击事件 */
            }
        }

        &--button {
            position: absolute;
            bottom: 0rpx;
            right: 0;
            background: none;
            border: none;
            font-size: 20rpx;
            text-shadow: 0 10rpx 10rpx rgb(255, 255, 255);

            &::after {
                border: none;
            }
        }


    }

    &__container {
        display: flex;
        gap: 20rpx;
        flex-wrap: wrap;
    }

    &__item {
        display: block;
    }

    &__tag {
        background-color: $border-color;
        display: block;
        min-width: 100rpx;
        box-sizing: border-box;
        padding: 10rpx 20rpx;
        border-radius: 5rpx;
        font-size: 27rpx;
    }

    .active {
        background-color: $pink-300;
        color: white;
    }

    // 禁用按钮
    .ban {
        opacity: 0.3;
        pointer-events: none;
    }

    &__number-box {
        display: flex;
        align-items: center;
        gap: 20rpx;

        &--left {
            font-size: 24rpx;
            color: $text-muted;
            opacity: 0.6;
        }

        &--price {
            flex: 1;
            font-size: 40rpx;
            color: $text-title;
            display: flex;
            justify-content: flex-end;
            padding-right: 20rpx;
            font-weight: 600;
            color: red;
        }
    }

    &__good-wrapper {
        display: flex;
        flex-direction: row;

        &--button {
            font-size: 30rpx;
        }

        .button {
            border-radius: 10rpx;
        }
    }


}
</style>
