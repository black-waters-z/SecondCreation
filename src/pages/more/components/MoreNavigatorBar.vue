<template>
  <view class="content bar">
    <view class="navigator">
      <uni-icons fontFamily="CustomFont" color="grey" size="24">
        &#xe89c;
      </uni-icons>
      官方消息
    </view>
    <view class="navigator">
      <uni-icons fontFamily="CustomFont" color="grey" size="24">
        &#xe89c; </uni-icons
      >回复
    </view>
    <view class="navigator">
      <uni-icons fontFamily="CustomFont" color="grey" size="24">
        &#xe89c; </uni-icons
      >点赞
    </view>
    <view class="navigator">
      <uni-icons fontFamily="CustomFont" color="grey" size="24">
        &#xe89c; </uni-icons
      >私信
    </view>
  </view>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@font-face {
  font-family: CustomFont;
  src: url("../../static/iconfont.ttf");
}

.bar {
  background-color: white;
  width: 95vw;
  height: 110rpx;
  border-radius: 8px;
  margin-top: 20rpx;
  flex-direction: row;
  padding: 20rpx 0;
  .navigator {
    width: 20%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}
</style>
