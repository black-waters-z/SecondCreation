import { onMounted, ref } from "vue";
import { defineStore } from "pinia";

export const useTabBarStore = defineStore("tabBarStore", () => {
  // 默认的tabBar的index值，也就是zone的index，可以用来调节这个页面的数据
  const activeTabBarIndex = ref(0);

  onMounted(() => {
    activeTabBarIndex.value = Number(uni.getStorageSync("TABBARINDEX"));
  });

  const changeTabBarIndex = (index: number) => {
    activeTabBarIndex.value = index;
    uni.setStorageSync("TABBARINDEX", String(index));
  };
  return { activeTabBarIndex, changeTabBarIndex };
});
