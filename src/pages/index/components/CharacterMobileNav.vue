<template>
  <view
    class="character-mobile-nav-container w-100"
    :class="isShow ? 'character-mobile-nav-container__active' : ''"
  >
    <view class="character-mobile-nav-container-view">
      <ul class="character-mobile-nav-container-view__ul">
        <li
          v-for="(value, index) in characters"
          :key="index"
          class="character-mobile-nav-container-view__li"
        >
          <navigator
            :url="value.navigatorUrl"
            hover-class="character-mobile-nav-container__navigator-hover"
            class="character-mobile-nav-container__navigator"
          >
            <text class="character-name">{{ value.name }}</text>
          </navigator>
        </li>
        <li class="character-mobile-nav-container-view__li">
          <uni-icons
            type="closeempty"
            size="30"
            @click="$emit('toggleMobileNav')"
          ></uni-icons>
        </li>
      </ul>
    </view>
  </view>
</template>

<script setup lang="ts">
const characters = [
  {
    name: "角色百科",
    avatar: "/static/avatar/avatar1.jpg",
    navigatorUrl: "/pages/character/index",
  },
  { name: "粮仓导航", avatar: "/static/avatar/avatar1.jpg" },
  { name: "火热合集", avatar: "/static/avatar/avatar1.jpg" },
  { name: "官方公告", icon: "\ue600" },
  { name: "搜索", icon: "\ue60d" },
];

const props = defineProps<{
  isShow: boolean;
}>();
</script>

<style lang="scss" scoped>
@font-face {
  font-family: CustomFont;
  src: url("../../../static/iconfont.ttf");
}

.character-mobile-nav-container {
  position: fixed;
  z-index: 1000;
  height: 100%;
  background-color: white;
  transform: translateX(100%);
  transition: 0.3s ease-in-out;

  &-view {
    box-sizing: border-box;
    padding: {
      top: 0px;
      left: 20px;
      right: 20px;
      bottom: 20px;
    }

    &__ul {
      & > li:last-child {
        border-bottom: none;
        display: flex;
        justify-content: center;

        .uni-icons {
          padding: 10px;
          border-radius: 100px;
          background-color: $pink-200;
          font-weight: 700;
          color: white !important;
          box-shadow: 0 3px 20px $pink-shadow-01;
        }
      }
    }

    &__li {
      padding: 20px 0;
      font-size: 18px;
      border-bottom: 1px solid $border-color;
    }
  }
}

.character-mobile-nav-container__active {
  transform: translateX(0%);
}
</style>
