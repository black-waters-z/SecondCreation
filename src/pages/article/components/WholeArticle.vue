<template>
  <view class="whole-article-container">
    <view class="whole-article-container__article">
      <view class="author">
        <view class="author__avatar"></view>
        <view class="author__name">name</view>
      </view>
      <view class="article">
        <view class="article__title">title</view>
        <view class="article__content">I like a big cat.</view>
        <br />
        <view class="article__post-time">
          <text>2022-03-03</text>
        </view>
        <view class="article__interact">
          <uni-icons
            fontFamily="CustomFont"
            size="18"
            v-if="!like"
            @click="like = !like"
            class="icon"
            >&#xe635;
          </uni-icons>
          <uni-icons
            fontFamily="CustomFont"
            size="18"
            v-if="like"
            @click="like = !like"
            class="icon"
            color="darkred"
            >&#xe62b;
          </uni-icons>
          <uni-icons
            type="star"
            size="23"
            v-if="!favorite"
            class="icon"
            @click="favorite = !favorite"
          ></uni-icons>
          <uni-icons
            type="star-filled"
            size="23"
            v-if="favorite"
            class="icon"
            @click="favorite = !favorite"
          ></uni-icons>
          <uni-icons fontFamily="CustomFont" size="18" class="icon"
            >&#xe6c9;
          </uni-icons>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref, toRefs } from "vue";

const props = defineProps<{ art_id: number }>();
const interactInfo = ref({
  like: true,
  favorite: true,
});

const { like, favorite } = toRefs(interactInfo.value);
const activeShow = ref(false);

const toggleLike = () => {
  like.value = !like.value;
  if (like.value) {
    activeShow.value = true;
    setTimeout(() => {
      activeShow.value = false;
    }, 1000);
  }
};

onMounted(() => {
  console.log(props.art_id);
});
</script>

<style lang="scss" scoped>
@font-face {
  font-family: CustomFont;
  src: url("../../../static/iconfont.ttf");
}

// #ifdef MP-WEIXIN
$whole-article-container__margin-top: 80rpx;
// #endif

// #ifdef H5
$whole-article-container__margin-top: 0rpx;
// #endif

.whole-article-container {
  width: 100vw;
  display: flex;
  justify-content: center;
  margin-top: $whole-article-container__margin-top;
  z-index: 600;

  &__article {
    width: 100vw;
    margin-top: 160rpx;
    background-color: white;
    padding-bottom: 20rpx;
    box-shadow: 0 10rpx 10rpx rgba(0, 0, 0, 0.1);
    position: relative;

    .author {
      width: 200rpx;
      height: 100rpx;
      border-radius: 1000rpx;
      margin: {
        top: -40rpx;
        left: 20rpx;
      }
      display: flex;
      align-items: flex-end;

      &__avatar {
        width: 100rpx;
        height: 100rpx;
        background-color: rgb(198, 197, 197);
        border-radius: 1000rpx;
      }

      &__name {
        font-size: 30rpx;
        font-weight: 700;
        margin-left: 10rpx;
        padding: {
          top: 6rpx;
          bottom: 6rpx;
        }
      }
    }

    .article {
      font-size: 26rpx;
      margin: {
        left: 40rpx;
        right: 40rpx;
      }

      &__title {
        display: flex;
        justify-content: center;
        font-weight: 700;
      }
      &__content {
        margin: {
          top: 20rpx;
          bottom: 20rpx;
        }
      }

      &__post-time {
        position: absolute;
        bottom: 10rpx;
        left: 40rpx;
        font-size: 23rpx;
        color: grey;
      }

      &__interact {
        position: absolute;
        bottom: 10rpx;
        right: 20rpx;
        .icon {
          margin-right: 15rpx;
          bottom: 0;
        }
      }
    }
  }
}
</style>
