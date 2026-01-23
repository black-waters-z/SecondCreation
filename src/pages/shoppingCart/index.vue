<template>
    <PageWrapper class="page--shopping-cart">
        <GoBack>
            <uni-icons type="cart" size="26"></uni-icons>
            购物车
        </GoBack>
        <template #scroll>
            <checkbox-group class="page--shopping-cart__checkbox">
                <label class="page--shopping-cart__check">
                    <checkbox value="cb" :checked="true" color="red" style="transform:scale(0.7)" />
                    <cart-good></cart-good>
                </label>
                <label class="page--shopping-cart__check">
                    <checkbox value="cb" color="red" style="transform:scale(0.7)" /> <cart-good></cart-good>
                </label>
            </checkbox-group>
        </template>
        <template #bottom>
            <GoToBuyBottom></GoToBuyBottom>
        </template>
    </PageWrapper>
</template>

<script setup lang="ts">
import PageWrapper from '@/components/container/PageContainer.vue';
import GoBack from '@/components/common/GoBack.vue';
import CartGood from './components/CartGood.vue';
import GoToBuyBottom from './components/GoToBuyBottom.vue';
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