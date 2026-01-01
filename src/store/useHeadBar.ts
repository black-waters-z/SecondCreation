import { ref } from "vue";
import { defineStore } from "pinia";

export const useHeadBarStore = defineStore("headBar", () => {
  // 记录当前的headBar的index值，也就是zone的index，可以用来调节这个页面的数据
  const activeNavigatorIndex = ref(-1);
  const handleNavigator = (idx: number) => {
    activeNavigatorIndex.value = idx;
  };
  return { activeNavigatorIndex, handleNavigator };
});
