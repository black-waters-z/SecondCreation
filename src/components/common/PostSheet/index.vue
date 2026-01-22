<!-- 发布 -->
<template>
  <view :class="visible ? `post-sheet-container active` : `post-sheet-container`">
    <view class="post-sheet-container__view">
      <view class="flex item-center" v-for="(row, rowIndex) in chunkedChoices" :key="rowIndex">
        <post-choice class="flex-1 item-center justify-center" v-for="choice in row" :key="choice.text + choice.icon"
          :text="choice.text" :backgroundcolor="choice.backgroundcolor" :url="choice.url" fontColor="grey">
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
import { computed } from 'vue';
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
  { text: '汉化组', icon: '\ue64a', backgroundcolor: 'white', url: '../post/index', color: '#737373' },
  { text: '上传视频', icon: '\ue64a', backgroundcolor: 'white', url: '../post/index?type=video', color: '#737373' },
  { text: '创建聊天室', icon: '\ue64a', backgroundcolor: 'white', url: '../post/index', color: '#737373' },
  { text: '发布商品', icon: '\ue64a', backgroundcolor: 'white', url: '../post/index', color: '#737373' },
];

const chunkedChoices = computed(() => {
  const chunkSize = 3;
  const result: Choice[][] = [];

  choices.forEach((choice, index) => {
    const row = Math.floor(index / chunkSize);
    if (!result[row]) {
      result[row] = [];
    }
    result[row].push(choice);
  });

  return result;
});
</script>

<style lang="less">
@font-face {
  font-family: CustomFont;
  src: url('../../../static/iconfont.ttf');
}

.post-sheet-container {
  width: 100%;
  position: fixed;
  z-index: 500;
  bottom: 130rpx;
  transform: translateY(70vh);
  display: flex;
  justify-content: center;
  transition: 0.5s ease-in-out;

  &__view {
    width: 80%;
    padding: 20rpx;
    background-color: white;
    border-radius: 16px;
    box-shadow: 0 20rpx 40rpx rgba(0, 0, 0, 0.15);
    display: grid;
    grid-template-rows: repeat(3, 100px);
  }
}

.active {
  transform: translateY(0vh);
}

.icon {
  width: 50%;
  height: 50%;
}

// #ifdef MP-WEIXIN

.post-sheet-container {
  bottom: 40rpx;
}

// #endif</style>
