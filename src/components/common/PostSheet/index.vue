<!-- 发布 -->
<template>
  <view :class="visible ? `post-sheet-container active` : `post-sheet-container`">
    <view class="post-sheet-container__view">
      <view class="flex" v-for="(row, rowIndex) in chunkedChoices" :key="rowIndex">
        <post-choice v-for="choice in row" :key="choice.text + choice.icon" :text="choice.text" :backgroundcolor="choice.backgroundcolor" :url="choice.url">
          <template #icon>
            <uni-icons fontFamily="CustomFont" size="33">
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
};

const choices: Choice[] = [
  { text: '发布文章', icon: '\ue649', backgroundcolor: 'antiquewhite', url: '../post/index?type=write' },
  { text: '发布图片', icon: '\ue668', backgroundcolor: 'antiquewhite', url: '../post/index' },
  { text: '上传视频', icon: '\ue64a', backgroundcolor: 'antiquewhite', url: '../post/index' },
  { text: '上传视频', icon: '\ue64a', backgroundcolor: 'antiquewhite', url: '../post/index' },
  { text: '上传视频', icon: '\ue64a', backgroundcolor: 'antiquewhite', url: '../post/index' },
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
  height: 500rpx;
  position: fixed;
  z-index: 500;
  bottom: 130rpx;
  transform: translateY(70vh);
  display: flex;
  justify-content: center;
  transition: 0.3s;

  &__view {
    width: 80%;
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
</style>
