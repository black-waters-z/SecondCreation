<template>
  <view>
    <view class="bar" v-for="(favorite, index) in favorites">
      <view class="image"></view>
      <view class="bar__text">
        <view class="title">{{ favorite.title }}</view>
        <view class="introduction">{{ favorite.introduction }}</view>
      </view>
      <view class="bar__more">
        <uni-icons fontFamily="CustomFont" color="grey" size="24">
          &#xe647;
        </uni-icons>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
interface Favorite {
  image: string;
  title: string;
  introduction: string;
}

withDefaults(defineProps<{ favorites?: Favorite[] }>(), {
  favorites: () => [
    { image: "12", title: "title", introduction: "12" },
    { image: "12", title: "12", introduction: "12" },
    { image: "12", title: "12", introduction: "12" },
  ],
});
</script>

<style lang="scss" scoped>
@font-face {
  font-family: CustomFont;
  src: url("../../../static/iconfont.ttf");
}

.bar {
  background-color: white;
  width: 95vw;
  height: 130rpx;
  border-radius: 8px;
  display: flex;
  align-items: center;
  margin-top: 20rpx;
  gap: 10rpx;

  .image {
    background-color: rgb(173, 173, 173);
    opacity: 0.5;
    width: 200rpx;
    height: 120rpx;
    border-radius: 16rpx;
    margin-left: 20rpx;
  }

  &__text {
    display: flex;
    height: 120rpx;
    flex-direction: column;

    .title {
      font-weight: 600;
      width: calc(95vw - 200rpx - 100rpx);
      overflow: hidden;
    }

    .introduction {
      font-family: 600;
      font-size: 25rpx;
      color: grey;
    }
  }

  &__more {
    height: 110rpx;
  }
}
</style>
