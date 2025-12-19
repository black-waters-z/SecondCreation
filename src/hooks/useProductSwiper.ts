import { ref } from "vue";
import { debounce } from "lodash";
export function useProductSwiper() {
  const scrollLeft = ref(0);
  const stopScrollRight = ref(false);
  const stopScrollLeft = ref(true);
  const goToRight = () => {
    if (!stopScrollRight.value) {
      scrollLeft.value += 300;
      stopScrollLeft.value = false;
    }
  };

  const goToLeft = () => {
    if (!stopScrollLeft.value) {
      scrollLeft.value -= 300;
      stopScrollRight.value = false;
    }
  };

  const scrollLeftStop = () => {
    stopScrollLeft.value = true;
    stopScrollRight.value = false;
  };

  const scrollRightStop = () => {
    stopScrollRight.value = true;
    stopScrollLeft.value = false;
  };

  const onScroll = debounce((e) => {
    scrollLeft.value = e.detail.scrollLeft;
  }, 150);

  return {
    goToRight,
    goToLeft,
    scrollLeft,
    scrollLeftStop,
    scrollRightStop,
    stopScrollLeft,
    stopScrollRight,
    onScroll,
  };
}
