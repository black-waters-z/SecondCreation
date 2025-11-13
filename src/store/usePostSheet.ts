import { ref } from "vue";
import { defineStore } from "pinia";

export const usePostSheetStore = defineStore("postSheet", () => {
  const visible = ref(false);

  const open = () => {
    visible.value = true;
  };
  const close = () => {
    visible.value = false;
  };
  const toggle = () => {
    visible.value = !visible.value;
  };

  return {
    visible,
    open,
    close,
    toggle,
  };
});
