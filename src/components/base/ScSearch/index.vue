<template>
    <view class="sc-search">
        <image src="/src/static/logo.png" class="sc-search__img" mode="scaleToFill" />
        <input class="sc-search__input" v-model="inputValue" placeholder=""
            placeholder-class="sc-search__input-placeholder" />
        <uni-icons class="sc-search__icon" type="search" size="30" @click="search" />
    </view>
</template>

<script setup lang="ts">


defineOptions({
  options: {
    virtualHost: true,
  },
});import { ref } from 'vue'
const inputValue = ref<string>('')

function search() {
    console.log('search', inputValue.value)
}
</script>

<style lang="scss" scoped>
.sc-search {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 8px 12px;
    gap: 6rpx;
    box-sizing: border-box;

    &__img {
        width: 130rpx;
        height: 50rpx;
        margin-right: 10rpx;
    }

    &__input {
        display: inline-block;
        width: 400rpx;
        background-color: white;
        border-radius: 100px;
        border: 3px solid #000;
        font-size: 32rpx;
        padding: 3rpx 10rpx;
        margin-left: 20rpx;
        color: $text-main;
    }

    &__icon {}
}

// #ifdef MP-WEIXIN
.sc-search {
    &__input {
        width: 250rpx;
    }
}

// #endif

@media screen and (min-width:600px) {
    .sc-search {
        display: none;
    }
}
</style>