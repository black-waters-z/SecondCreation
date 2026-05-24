<template>
  <view class="w-full bg-white head-nav">
    <!-- #ifdef MP-WEIXIN -->
    <view class="status_bar w-100">
      <view class="status_bar__logo-search" v-if="showSearch">
        <navigator v-for="(item, idx) in navigate_datas" :key="idx" open-type="navigate" :url="item.url">
          <text class="status_bar__bt" :class="{ 'status_bar__bt-active': idx === 0 }">{{ item.text }}</text>
        </navigator>
      </view>
    </view>
    <!-- #endif -->
    <!-- #ifdef H5 -->
    <view class="nav !flex bg-white">
      <view class="flex-1 flex">
        <navigator open-type="switchTab" url="/pages/index/index">
          <image src="/static/logo.png" mode="scaleToFill" class="logo" />
        </navigator>
      </view>
      <view><uni-icons type="bars" size="30" @click="toggleMobileNav" color="#000"></uni-icons>
        <navigator url="../search/index">
          <uni-icons type="search" size="30" color="#000"></uni-icons>
        </navigator>
      </view>
    </view>
    <character-mobile-nav :is-show="showMobileNav" @toggle-mobile-nav="toggleMobileNav"></character-mobile-nav>
    <!-- #endif -->
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// #ifdef H5
import CharacterMobileNav from '@/pages/index/components/CharacterMobileNav.vue';
// #endif
import { onHide } from '@dcloudio/uni-app';
defineOptions({
  options: {
    styleIsolation: 'shared',
    virtualHost: true,
  },
});

const navigate_datas = ref([
  { text: '创作域', url: '/pages/index/index' },
  { text: 'tag导航', url: '/pages/tagNav/index' },
  { text: '搜索', url: '/pages/search/index' },
  { text: '智能ai', url: '/pages/iconNavigate/index?icon=AITalk' }
]);

defineProps<{ showSearch?: boolean }>();
const showMobileNav = ref(false);

function toggleMobileNav() {
  showMobileNav.value = !showMobileNav.value;
}

function navigateTo(url: string) {
  uni.navigateTo({
    url: url
  });
}

onHide(() => {
  showMobileNav.value = false;
});
</script>

<style lang="scss">
.status_bar {
  width: 100vw;
  top: 0;
  height: 80rpx;
  background: white;
  left: 0;
  display: flex;
  gap: 20rpx;

  &__bt {
    font-size: 30rpx;
    color: #000;
    font-weight: 400;
    padding: 0rpx 20rpx;

    &-active {
      font-weight: 600;
      font-size: 39rpx;
      color: rgb(230, 92, 160);
    }
  }

  &__logo-search {
    display: flex;
    align-items: center;
    padding: 0 20rpx;

    .logo {
      width: 81.3px;
      height: 29.7px;
      margin-left: 20rpx;
    }
  }
}

.head-nav {
  z-index: 1000;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.nav {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background: white;

  ::v-deep .navigator-wrap {
    display: flex;
    align-items: center;
  }

  navigator {
    display: inline-flex;
    align-items: center;
  }

  .logo {
    width: 130rpx;
    height: 50rpx;
    margin-right: auto; // 左侧
  }

  .uni-icons {
    font-size: 20px !important;
    margin-left: 10px; // 图标之间间距
    font-weight: 600;
    float: right;
  }
}

.search-bar-container {
  justify-content: flex-start !important;
}

.search-bar-container .search-container {
  margin-left: 40rpx !important;
}

@media (min-width: 600px) {
  .head-nav {
    display: none;
  }

  .nav {
    display: none;
  }
}

//  #ifdef MP-WEIXIN
.head-nav {
  box-shadow: none !important;
}

//  #endif
</style>
