<template>
    <view class="cart-good" @click.stop>
        <image class="cart-good__img" mode="aspectFill" :src="source?.choice?.choiceImg"></image>
        <view class="cart-good__info">
            <view class="title">
                <text class="cart-good__info--title">{{ source?.goodName }}</text>
                <text class="cart-good__info--choice">{{ source?.choice?.choiceName }}</text>
            </view>
            <uni-number-box :min="1" :max="9" v-model="buyNum" />
            <SCButton class="cart-good__info--buy" type="button" @click="goToBuy">购买</SCButton>
        </view>
        <view class="cart-good__info--price">
            <text>￥{{ price }}</text>
            <uni-icons type="close" size="27" class="cart-good__info--price__icon" color="grey"
                @click="deleteGood"></uni-icons>
        </view>
    </view>
</template>

<script setup lang="ts">
import SCButton from "@/components/common/SCButton/index.vue"
import type { goodChoiceAdd } from "@/pages/shoppingCart/type"
import { computed, ref } from "vue";
import { deleteCartGoodChoice } from "@/api/shopApi"
const props = defineProps<{ source: goodChoiceAdd, modelValue: number }>()
const emit = defineEmits<{
    (e: 'update:modelValue', value: number): void,
    (e: 'deleteGood'): void
}>()
const buyNum = ref<number>(props.source?.choice?.buyNum)
const price = computed(() => {
    emit('update:modelValue', props.source.choice.price * buyNum.value)
    return props.source.choice.price * buyNum.value
})

const buyChoice = ref<goodChoiceAdd>(props.source)
function goToBuy() {
    buyChoice.value.choice.buyNum = buyNum.value
    buyChoice.value.totalPrice = props.source.choice.price * buyNum.value;
    console.log(buyChoice.value)
}

async function deleteGood() {
    await deleteCartGoodChoice(props.source.choice.id)
    emit('deleteGood')
}
</script>

<style lang="scss" scoped>
.hidden {
    display: none;
}

.cart-good {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    padding: 10px;
    box-sizing: border-box;
    border-bottom: 1px solid $border-color;

    .cart-good__img {
        width: 100px;
        height: 100px;
        border-radius: 10px;
        background-color: $border-color;
    }

    .cart-good__info {
        letter-spacing: 4rpx;
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 10rpx 20rpx;

        .title {
            margin-bottom: 20rpx;
            display: flex;
            align-items: center;
        }

        &--title {
            font-size: 32rpx;
            font-weight: 600;
            max-width: 230rpx;
            -webkit-line-clamp: 2;
            display: -webkit-box;
            text-overflow: ellipsis;
            overflow: hidden;
            -webkit-box-orient: vertical;
        }

        &--choice {
            font-size: 24rpx;
            color: $text-muted;
            margin-left: 20rpx;
            opacity: 0.6;
        }

        &--buy {
            font-size: 23rpx;
            margin-top: 20rpx;

        }

        &--price {
            font-size: 34rpx;
            font-weight: 600;
            color: $text-title;
            margin-left: auto;
            box-sizing: border-box;
            padding-top: 20rpx;
            padding-right: 10rpx;
            display: flex;
            flex-direction: column;

            &__icon {
                flex: 1;
                display: flex;
                align-items: flex-end;
                justify-content: flex-end;
                font-weight: 500;
                margin-bottom: 15rpx;
                transition: all 0.3s;

                &::before {
                    cursor: pointer;
                }

            }
        }
    }
}

@media screen and (min-width:600px) {
    .cart-good {
        background-color: white;
        box-shadow: $grey-shadow-01;
        border-radius: 20px;
        margin-top: 10px;
        margin-left: 20px;
        margin-right: 20px;
    }
}
</style>