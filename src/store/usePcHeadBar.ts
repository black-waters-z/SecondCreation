// 一旦下滑就隐藏head-bar

import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePcHeadBar = defineStore('pcHeadBar', () => {
  const headActive = ref<boolean>(true);

  const toggleHeadBar = (status: boolean) => {
    headActive.value = status;
  };

  return { headActive, toggleHeadBar };
});
