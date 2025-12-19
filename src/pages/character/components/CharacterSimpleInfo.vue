<template>
  <view class="character-simple-info">
    <swiper
      class="character-simple-info__avatar"
      indicator-dots
      circular
      autoplay
      indicator-active-color="$pink-color"
    >
      <swiper-item
        v-for="(avatar, index) in avatarList"
        :key="`avatar-${index}`"
        class="character-simple-info__avatar-item"
      >
        <image
          class="character-simple-info__avatar-image"
          :src="avatar"
          mode="aspectFill"
        />
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup lang="ts">
import character1 from "@/static/character/character1.png";
import character2 from "@/static/character/character3.png";

const avatarList = [character1, character2];
</script>

<style lang="scss" scoped>
.character-simple-info {
  width: 100vw;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__avatar {
    width: 40vw;
    height: 60vw;
    margin-top: 90rpx;
    border-radius: 16rpx;
    overflow: hidden;
    background-color: #f5f5f5;
  }

  &__avatar-item {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__avatar-image {
    width: 100%;
    height: 100%;
  }

  &__content {
    width: 95vw;
    height: 100vw;
    background-color: rgb(221, 216, 216);
    margin-top: 20rpx;
  }
}
</style>
