<!-- 发布 -->
<template>
  <view :class="visible ? `post-sheet-container post-sheet-container__active` : `post-sheet-container`">
    <view class="post-sheet-container__view">
      <view class="flex item-center" v-for="(choice, rowIndex) in choices" :key="rowIndex">
        <post-choice class="flex-1 item-center justify-center" :key="choice.text + choice.icon" :text="choice.text"
          :backgroundcolor="choice.backgroundcolor" :url="choice.url" fontColor="grey">
          <template #icon>
            <uni-icons fontFamily="CustomFont" size="33" :color="choice?.color || '#000'">
              {{ choice.icon }}
            </uni-icons>
          </template>
        </post-choice>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { usePostSheetStore } from '@/store/usePostSheet';
import { storeToRefs } from 'pinia';
import PostChoice from './PostChoice.vue';

const postSheetStore = usePostSheetStore();
const { visible } = storeToRefs(postSheetStore);

type Choice = {
  text: string;
  icon: string;
  backgroundcolor: string;
  url: string;
  color: string;
};

const choices: Choice[] = [
  { text: '发布文章', icon: '\ue649', backgroundcolor: 'white', url: '../post/index?type=write', color: '#737373' },
  { text: '发布图片', icon: '\ue668', backgroundcolor: 'white', url: '../post/index?type=paint', color: '#737373' },
  { text: '上传视频', icon: '\ue64a', backgroundcolor: 'white', url: '../post/index?type=video', color: '#737373' },
  { text: '创建聊天室', icon: '\ue621', backgroundcolor: 'white', url: '../post/index', color: '#737373' },
  { text: '发布商品', icon: '\ue650', backgroundcolor: 'white', url: '../post/index', color: '#737373' },
];

</script>

<style lang="scss">
@font-face {
  font-family: CustomFont;
  src: url('../../../static/iconfont.ttf');
}

.post-sheet-container {
  width: 100%;
  position: fixed;
  height: 100px;
  z-index: 500;
  bottom: 130rpx;
  display: flex;
  justify-content: center;
  transition: 0.5s ease-in-out;
  left: 50%;
  transform: translateX(-50%) translateY(calc(100% + 100rpx));


  &__view {
    width: 90%;
    padding: 20rpx;
    background-color: white;
    border-radius: 16px;
    box-shadow: 0 20rpx 40rpx rgba(0, 0, 0, 0.15);
    display: grid;
    grid-template-columns: repeat(5, 100px);
    overflow-x: auto;
    position: relative;
  }


  &::after {
    content: '';
    position: absolute;
    z-index: 100;
    right: 20rpx;
    top: 0;
    width: 50px;
    height: 100px;
    background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, white 100%);
    border-radius: 16px;
  }

  &::before {
    content: '';
    position: absolute;
    z-index: 100;
    left: 20rpx;
    top: 0;
    width: 50px;
    height: 100px;
    background: linear-gradient(to left, rgba(255, 255, 255, 0) 0%, white 100%);
    border-radius: 16px;
  }
}

.post-sheet-container__active {
  transform: translateX(-50%);
}

.icon {
  width: 50%;
  height: 50%;
}

@media screen and (min-width:600px) {
  .post-sheet-container {
    &__view {
      width: 900px;
      height: 100px;
      padding: 20rpx;
      background-color: white;
      border-radius: 16px;
      box-shadow: 0 20rpx 40rpx rgba(0, 0, 0, 0.15);
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      transform: translateY(20rpx);
    }

    &::after,
    &::before {
      display: none;
    }

    &__active {
      transform: translateX(-50%) translateY(-60rpx);
    }
  }


}
</style>
