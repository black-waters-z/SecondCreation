<template>
  <view class="common-swiper">
    <uni-icons class="common-swiper__icon" fontFamily="CustomFont" :size="26" color="white" v-if="showIcon"
      @click="showWrapper">{{ '\uec13'
      }}</uni-icons>
    <uni-swiper-dot :info="swiperInfo" :current="current" field="content" :mode="mode" :dotsStyles="dotStyles">
      <swiper class="swiper-box" :style="{ ...styles }" circular interval="3000" duration="500" @change="change">
        <swiper-item v-for="(item, index) in swiperInfo" :key="index">
          <image mode="aspectFill" class="swiper-item" :src="item.swiperImg"> </image>
          <view class="author-info" v-if="item.bottomBar" :style="item.bottomBar?.style">
            <view class="avatar" :style="item.bottomBar?.avatarStyle"></view>
            <view class="author">{{ item.bottomBar.authorText }}</view>
          </view>
        </swiper-item>
      </swiper>
    </uni-swiper-dot>
    <slot></slot>
    <image-wrapper ref="imageWrapper" :image="swiperInfo[current].swiperImg"></image-wrapper>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ImageWrapper from "@/components/base/ImageWrapper/index.vue"
type CSSProperties = Record<string, string | number | undefined>;
const imageWrapper = ref<typeof ImageWrapper>();

function showWrapper() {
  imageWrapper.value?.toggleShow();
}
// props:styles 长高
// swiperInfo: 轮播图数据，底部栏数据
withDefaults(
  defineProps<{
    showIcon?: boolean;
    styles?: {
      width?: string;
      height?: string;
      maxWidth?: string;
      maxHeight?: string;
      minWidth?: string;
      minHeight?: string;
    };
    swiperInfo: {
      swiperImg: string;
      bottomBar?: {
        avatar: string;
        authorText: string;
        style: CSSProperties;
        avatarStyle?: CSSProperties;
        textStyle?: CSSProperties;
      };
    }[];
  }>(),
  {
    swiperInfo: () => [
      {
        swiperImg: `${import.meta.env.VITE_STATIC_IMG_BASE}/homepic/homepic3.png`,
      },
      {
        swiperImg: `${import.meta.env.VITE_STATIC_IMG_BASE}/homepic/homepic2.png`,
      },
    ],
    styles: () => ({}),
  },
);

const dotStyles = {
  color: 'pink',
  backgroundColor: 'grey',
  border: 'grey',
  selectedBackgroundColor: 'pink',
  selectedBorder: 'pink',
};

const current = ref(0);
const mode = ref<'round' | 'round-dot'>('round'); // keep whatever modes you use

const change = (e: any) => {
  current.value = e.detail.current;
};

// #ifdef MP-WEIXIN
defineOptions({
  options: {
    styleIsolation: 'shared', // 允许样式穿透（微信小程序）
    virtualHost: true,
  },
});
// #endif
</script>

<style lang="scss" scoped>
.common-swiper {
  position: relative;

  &__icon {
    position: absolute;
    top: 20rpx;
    right: 20rpx;
    z-index: 500;
    text-shadow: 0 0 10rpx rgba(0, 0, 0, 0.3);
  }
}

@media screen and (max-width:600px) {
  .swiper-box {
    width: 100vw;
    height: 60vw;
  }
}


.swiper-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: none;

  ::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 400;
  }
}

.navigation-img {
  width: 16vw;
  height: 16vw;
}

.navigation text {
  margin-top: 10rpx;
}

.author-info {
  position: absolute;
  bottom: 0rpx;
  height: 50rpx;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: antiquewhite;
  box-shadow: 0 0 20rpx 0 rgba(0, 0, 0, 0.3);

  .avatar {
    width: 80rpx;
    height: 80rpx;
    background-color: antiquewhite;
    border-radius: 50%;
    margin-left: 20rpx;
    transform: translateY(-20rpx);
    border: 2rpx solid white;
  }

  .author {
    color: black;
    margin-left: 20rpx;
    font-size: 22rpx;
  }
}

::v-deep .uni-swiper__dots-box {
  justify-content: flex-end !important;
  margin-right: 30rpx;
}

@media screen and (min-width:600px) {

  .swiper-box {
    width: 500px;
    height: 600px;
    border-radius: 50px;

    .swiper-item {
      border-radius: 50px;
    }
  }

}
</style>
