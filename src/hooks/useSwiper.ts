import { ref } from "vue";

export function useSwiper() {
  const currentIndex = ref(0);

  const changeToSwiperIndex = (index: number) => {
    currentIndex.value = index;
  };

  const goToNextSwiper = (swiperItemNum: number) => {
    currentIndex.value = (currentIndex.value + 1) % swiperItemNum;
  };

  const goBackSwiper = (swiperItemNum: number) => {
    currentIndex.value =
      (currentIndex.value - 1 + swiperItemNum) % swiperItemNum;
  };
}
