import { type Article } from '@/pages/tagPage/type';
import { nextTick } from 'vue';
import { ref, type InjectionKey } from 'vue';
enum RefreshType {
  PullDown = 'PullDown',
  Restore = 'Restore',
  Loading = 'Loading',
}
export function useScrollView(fetchData?: (page: number, page_size?: number) => Article[] | Promise<Article[]>) {
  const triggered = ref<string | boolean>(false);
  let isRefreshing = false;
  const scrollToTop = ref(0.01);
  const canLoadingMore = ref(true);
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
    console.log('onEnd', canLoadingMore.value);
    if (!fetchData || !canLoadingMore.value) return;
    // isLoadingMore = true;
    const result = await fetchData(page.value + 1, page_size.value);
    if (result.length) {
      page.value += 1;
      canLoadingMore.value = true;
    } else {
      canLoadingMore.value = false;
    }
  };

  const changeTab = () => {
    canLoadingMore.value = true;
    page.value = 1;
    console.log('changeTab', canLoadingMore.value);
  };

  const scrollTop = () => {
    scrollToTop.value = 0;
    nextTick(() => {
      scrollToTop.value = 0.01;
    });
  };

  return {
    triggered,
    refreshType,
    scrollToTop,
    onPulling,
    onRefresh,
    onRestore,
    onAbort,
    onEnd,
    scrollTop,
    changeTab,
  };
}

export type ScrollViewContext = ReturnType<typeof useScrollView>;
export const ScrollViewKey: InjectionKey<ScrollViewContext> = Symbol('ScrollView');
