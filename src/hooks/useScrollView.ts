import { onMounted, ref } from 'vue';
enum RefreshType {
  PullDown = 'PullDown',
  Restore = 'Restore',
  Loading = 'Loading',
}
export function useScrollView() {
  const triggered = ref<string | boolean>(true);
  let isRefreshing = false;
  const refreshType = ref<RefreshType>(RefreshType.PullDown);
  const onPulling = (e: Event) => {
    // console.log("onpulling", e);
    refreshType.value = RefreshType.PullDown;
  };

  const onRefresh = () => {
    if (isRefreshing) return;
    isRefreshing = true;
    refreshType.value = RefreshType.Loading;
    setTimeout(() => {
      triggered.value = false;
      isRefreshing = false;
    }, 3000);
  };

  const onRestore = () => {
    triggered.value = 'restore';
    refreshType.value = RefreshType.Restore;
  };

  const onAbort = () => {
    console.log('onAbort');
  };

  onMounted(() => {
    isRefreshing = false;
    setTimeout(() => {
      triggered.value = true;
    }, 1000);
  });

  return {
    triggered,
    refreshType,
    onPulling,
    onRefresh,
    onRestore,
    onAbort,
  };
}
