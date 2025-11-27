<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { usePostSheetStore } from "./store/usePostSheet";

onLaunch(() => {
  if (import.meta.env.DEV) {
    console.log("App Launch");
  }
  const postSheetStore = usePostSheetStore();
  // #ifdef H5
  uni.onTabBarMidButtonTap(() => {
    postSheetStore.toggle();
  });
  // #endif
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style lang="scss">
@import "./static/iconfont.css";

$background-color: white;
$grey-background-color: rgb(248, 248, 248);
$pink-color: rgb(244, 143, 177);

page {
  background-color: $grey-background-color;
  --text-title-family: "Source Han Sans";
  --background-color: white;
  --font-title-color: #1f2933;
  --grey-background-color: #{$grey-background-color};
  --pink-color: #{$pink-color};
  --status-bar-height: 50px;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  height: calc(100vh - 240rpx);
  background-color: var(--grey-background-color);
}

.content::-webkit-scrollbar {
  display: none;
}
</style>
