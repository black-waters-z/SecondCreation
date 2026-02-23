import { ref } from 'vue';
enum RefreshType {
  PullDown = 'PullDown',
  Restore = 'Restore',
  Loading = 'Loading',
}
export function useScrollView(fetchData?: (page: number, page_size?: number) => void) {
  const triggered = ref<string | boolean>(false);
  let isRefreshing = false;
  let isLoadingMore = false;
  const refreshType = ref<RefreshType>(RefreshType.PullDown);
  const page = ref(2);
  const page_size = ref(10);
  const onPulling = (e: Event) => {
    // console.log("onpulling", e);
    refreshType.value = RefreshType.PullDown;
  };

  const onRefresh = () => {
    if (isRefreshing) return;
    isRefreshing = true;
    triggered.value = true;
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

  const onEnd = async () => {
    if (!fetchData || isLoadingMore) return;
    isLoadingMore = true;
    await fetchData(page.value, page_size.value);
    page.value += 1;
    isLoadingMore = false;
  };

  return {
    triggered,
    refreshType,
    onPulling,
    onRefresh,
    onRestore,
    onAbort,
    onEnd,
  };
}
