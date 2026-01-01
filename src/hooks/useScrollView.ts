import { onMounted, ref } from "vue";

export function useScrollView() {
  const triggered = ref<string | boolean>(false);
  let isRefreshing = false;

  const onPulling = (e: Event) => {
    // console.log("onpulling", e);
  };

  const onRefresh = () => {
    if (isRefreshing) return;
    isRefreshing = true;
    console.log("鍒锋柊");
    setTimeout(() => {
      triggered.value = false;
      isRefreshing = false;
    }, 3000);
  };

  const onRestore = () => {
    triggered.value = "restore";
    console.log("onRestore");
  };

  const onAbort = () => {
    console.log("onAbort");
  };

  onMounted(() => {
    isRefreshing = false;
    setTimeout(() => {
      triggered.value = true;
    }, 1000);
  });

  return {
    triggered,
    onPulling,
    onRefresh,
    onRestore,
    onAbort,
  };
}
