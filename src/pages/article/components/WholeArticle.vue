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

  &__article {
    width: 98vw;
    margin-top: 160rpx;
    background-color: white;
    border-radius: 16rpx;
    padding-bottom: 20rpx;
    margin-bottom: 30rpx;

    .author {
      position: absolute;
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
      margin-top: 100rpx;
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
        }
      }

      &__interact {
        float: right;
        .icon {
          margin-right: 15rpx;
        }
      }
    }
  }
}
</style>
