<template>
    <PageWrapper class="page--shopping-cart">
        <GoBack>
            <uni-icons type="cart" size="26"></uni-icons>
            购物车
        </GoBack>
        <template #scroll>
            <checkbox-group class="page--shopping-cart__checkbox" @change="changeIndex">
                <label class="page--shopping-cart__check" v-for="(value, idx) in cartChoices" :key="idx">
                    <checkbox :value="idx" :checked="false" color="red" style="transform:scale(0.7)" />
                    <cart-good :source="value" :model-value="prices[idx]"
                        @update:model-value="updatePrice(idx, $event)"></cart-good>
                </label>
            </checkbox-group>
        </template>
        <template #bottom>
            <GoToBuyBottom :total-price="totalValue" @go-to-buy="goToBuy"></GoToBuyBottom>
        </template>
    </PageWrapper>
</template>

<script setup lang="ts">
import PageWrapper from '@/components/container/PageContainer.vue';
import GoBack from '@/components/common/GoBack.vue';
import CartGood from './components/CartGood.vue';
import GoToBuyBottom from './components/GoToBuyBottom.vue';
import type { goodChoiceAdd } from '@/pages/shoppingCart/type';
import { ref, watch } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { getCartGoodChoices } from "@/api/shopApi"
const cartChoices = ref<goodChoiceAdd[]>([])
const prices = ref<number[]>([])
onLoad(async () => {
    cartChoices.value = await getCartGoodChoices()
    prices.value = cartChoices.value.map(item => item.choice.price)
})

const updatePrice = (index: number, newValue: number) => {
    prices.value[index] = newValue;
}

const totalValue = ref(0);
const checkedIndex = ref<number[]>([])

function changeIndex($event) {
    checkedIndex.value = $event.detail.value;
    changePrice()
}

function changePrice() {
    totalValue.value = prices.value.reduce((sum, current, currentIndex) => {
        if (checkedIndex.value.includes(currentIndex)) {
            return sum + current
        }
        return sum
    }, 0)
}

watch(() => prices, () => {
    changePrice()
}, {
    deep: true
})

const returned = ref<goodChoiceAdd[]>([])
watch([() => checkedIndex, () => prices], () => {
    if (!changeIndex) return;
    returned.value = checkedIndex.value.map((_, idx) => {
        cartChoices.value[idx].choice.buyNum = prices.value[idx] / cartChoices.value[idx].choice.price
        cartChoices.value[idx].totalPrice = prices.value[idx]
        return cartChoices.value[idx]
    })
}, {
    deep: true,
    immediate: true
})

function goToBuy() {
    console.log('去结算')
    console.log(returned.value)
    // uni.navigateTo({
    //     url: '/pages/shoppingCart/buy'
    // })
}
</script>

<style lang="scss">
page {
    height: 100%;
}

.page--shopping-cart {

    &__checkbox {
        box-sizing: border-box;
        padding-left: 10rpx;
    }

    .page--shopping-cart__check {
        width: 100%;
        display: flex;
        align-items: center;

        .cart-good {
            flex: 1;
        }
    }
}
</style>
