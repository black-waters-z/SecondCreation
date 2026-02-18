<template>
  <view class="character-mobile-nav-container w-100" :class="isShow ? 'character-mobile-nav-container__active' : ''">
    <view class="character-mobile-nav-container-view">
      <ul class="character-mobile-nav-container-view__ul">
        <li v-for="(value, index) in characters" :key="index" class="character-mobile-nav-container-view__li">
          <navigator :url="value.navigatorUrl" :open-type="value?.switch ? 'switchTab' : 'navigate'"
            hover-class="character-mobile-nav-container__navigator-hover"
            class="character-mobile-nav-container__navigator">
            <text class="character-name">{{ value.name }}</text>
          </navigator>
        </li>
        <li class="character-mobile-nav-container-view__li">
          <uni-icons type="closeempty" size="30" @click="$emit('toggleMobileNav')"></uni-icons>
        </li>
      </ul>
    </view>
  </view>
</template>

<script setup lang="ts">
const characters = [
  {
    name: 'tag导航',
    avatar: '/src/static/avatar/avatar1.jpg',
    navigatorUrl: '/pages/tagNav/index',
  },
  { name: '粮仓导航', avatar: '/src/static/avatar/avatar1.jpg', navigatorUrl: '/pages/store/index', switch: true },
  { name: '火热合集', avatar: '/src/static/avatar/avatar1.jpg' },
  { name: '官方公告', icon: '\ue600', navigatorUrl: '/pages/notice/index' },
  { name: '搜索', icon: '\ue60d', navigatorUrl: '/pages/search/index' },
];

const props = defineProps<{
  isShow: boolean;
}>();
</script>

<style lang="scss" scoped>
@font-face {
  font-family: CustomFont;
  src: url('../../../static/iconfont.ttf');
}

.character-mobile-nav-container {
  position: fixed;
  z-index: 1000;
  height: 100%;
  top: 0;
  background-color: white;
  transform: translateX(100%);
  opacity: 0;
  transition: 0.5s ease-in-out;

  &-view {
    box-sizing: border-box;

    &__ul {
      letter-spacing: 4rpx;
      font-weight: 500;

      &>li:last-child {
        border-bottom: none;
        box-shadow: none;
        display: flex;
        justify-content: center;
        transition: all 0.3s ease-in-out;

        .uni-icons {
          padding: 10px;
          border-radius: 100px;
          background-color: $pink-200;
          font-weight: 700;
          color: white !important;
        }

        &:active {
          transform: scale(0.9);
        }
      }
    }

    &__li {
      padding: 30rpx 40rpx;
      font-size: 16px;
      border-bottom: 1rpx dashed $border-color;
    }
  }
}

.character-mobile-nav-container__active {
  opacity: 1;
  transform: translateX(0%);
}
</style>
