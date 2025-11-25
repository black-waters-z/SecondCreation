<!-- 发帖 -->

<template>
  <view
    :class="visible ? `post-sheet-container active` : `post-sheet-container`"
  >
  <view :style="{display:'flex',justifyContent:'center'}">
    <post-choice text="发布文章" backgroundcolor="antiquewhite">
      <template #icon>
        <uni-icons  fontFamily="CustomFont" size="30">
          {{ '&#xe649' }}
        </uni-icons>
      </template>
    </post-choice>
    <post-choice text="发布图片" backgroundcolor="antiquewhite">
      <template #icon>
        <uni-icons  fontFamily="CustomFont" size="30">
          {{ '&#xe668;' }}
        </uni-icons>
      </template>
    </post-choice>
    <post-choice text="上传视频" backgroundcolor="antiquewhite">
      <template #icon>
        <uni-icons  fontFamily="CustomFont" size="30">
          {{ '&#xe64a;' }}
        </uni-icons>
      </template>
    </post-choice>
  </view>

  </view>
</template>

<script lang="ts" setup>
import { usePostSheetStore } from "@/store/usePostSheet";
import { storeToRefs } from "pinia";
import PostChoice from "./PostChoice.vue";
import { ref } from "vue";
const postSheetStore = usePostSheetStore();
const { visible } = storeToRefs(postSheetStore);

</script>

<style lang="less" scoped>
@font-face {
	font-family: CustomFont;
	src: url('../../static/iconfont.ttf');
}


.post-sheet-container {
  background-color: white;
  position: fixed;
  z-index: 500;
  bottom: 130rpx;
  border-radius: 16px;
  box-shadow: 0 20rpx 40rpx rgba(0, 0, 0, 0.15);
  transform: translateY(70vh);
  padding: 30rpx;
  /* #ifdef MP-WEIXIN */
  transform: translate(-50%, 70vh); /* 兼顾 X/Y 两个方向 */
  bottom: 30rpx;
  /* #endif */
  transition: 0.3s;
}

.active {
  transform: translateY(0vh);
  /* #ifdef MP-WEIXIN */
  transform: translate(-50%, 0vh); /* 兼顾 X/Y 两个方向 */
  /* #endif */
}

.icon {
  width: 50%;
  height: 50%;
}


</style>
