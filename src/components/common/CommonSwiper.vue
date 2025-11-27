<template>
  <view>
    <uni-swiper-dot
      :info="swiperInfo"
      :current="current"
      field="content"
      :mode="mode"
      :dotsStyles="dotStyles"
    >
      <swiper
        class="swiper-box"
        :style="{ ...styles }"
        autoplay
        circular
        interval="3000"
        duration="500"
        @change="change"
      >
        <swiper-item v-for="(item, index) in swiperInfo" :key="index">
          <image mode="aspectFill" class="swiper-item" :src="item.swiperImg">
          </image>
          <view
            class="author-info"
            v-if="item.bottomBar"
            :style="item.bottomBar?.style"
          >
            <view class="avatar" :style="item.bottomBar?.avatarStyle"></view>
            <view class="author">{{ item.bottomBar.authorText }}</view>
          </view>
        </swiper-item>
      </swiper>
    </uni-swiper-dot>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";

type CSSProperties = Record<string, string | number | undefined>;

// props:styles 长高
// swiperInfo: 轮播图数据，底部栏数据
withDefaults(
  defineProps<{
    styles?: {
      width: string;
      height: string;
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
        swiperImg: "/static/homepic/homepic3.png",
        bottomBar: {
          avatar: "/static/character/character1.png",
          authorText: "匿名1/绘",
          style: {
            backgroundColor: "white",
          },
          avatarStyle: {
            backgroundColor: "antiquewhite",
          },
        },
      },
      {
        swiperImg: "/static/homepic/homepic2.png",
        bottomBar: {
          avatar: "/static/character/character1.png",
          authorText: "匿名/绘",
          style: {
            backgroundColor: "antiquewhite",
          },
          avatarStyle: {
            backgroundColor: "white",
          },
        },
      },
    ],
    styles: () => ({ width: "100vw", height: "60vw" }),
  }
);

const dotStyles = {
  color: "pink",
  backgroundColor: "grey",
  border: "grey",
  selectedBackgroundColor: "pink",
  selectedBorder: "pink",
};

const current = ref(0);
const mode = ref<"round" | "round-dot">("round"); // keep whatever modes you use

const change = (e: any) => {
  current.value = e.detail.current;
};

defineOptions({
  options: {
    styleIsolation: "shared", // 允许样式穿透（微信小程序）
  },
});
</script>

<style lang="scss" scoped>
.swiper-box {
  width: 100vw;
  height: 60vw;
}

.swiper-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
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

@media screen and (min-width: 600px) {
  .swiper-box {
    width: 600px;
    height: 360px;
    border-radius: 12rpx;
  }

  .swiper-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    border-radius: 18px;
  }
}
</style>
