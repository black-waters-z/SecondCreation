import { type Article } from '@/pages/tagPage/type';
import { nextTick } from 'vue';
import { ref, type InjectionKey } from 'vue';
import { usePcHeadBar } from '@/store/usePcHeadBar';
import { throttle } from 'lodash';

enum RefreshType {
  PullDown = 'PullDown',
  Restore = 'Restore',
  Loading = 'Loading',
}
export function useScrollView(fetchData?: (page: number, page_size?: number) => Article[] | Promise<Article[]>) {
  const { toggleHeadBar } = usePcHeadBar();
  const triggered = ref<string | boolean>(false);
  let isRefreshing = false;
  const scrollToTop = ref(0.01);
  const canLoadingMore = ref(true);
  const refreshType = ref<RefreshType>(RefreshType.PullDown);
  const page = ref(1);
  const page_size = ref(10);
  const scrollTopOld = ref(0);
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

  const onScroll = throttle((e) => {
    const currentScrollTop = e.detail.scrollTop;
    if (currentScrollTop > scrollTopOld.value + 50) {
      scrollTopOld.value = currentScrollTop;
      toggleHeadBar(false);
    } else if (currentScrollTop < scrollTopOld.value - 50) {
      scrollTopOld.value = currentScrollTop;
      toggleHeadBar(true);
    } else {
      scrollTopOld.value = currentScrollTop;
    }
  }, 100);

  const onEnd = async () => {
    // console.log('onEnd', canLoadingMore.value);
    if (!fetchData || !canLoadingMore.value) return;
    // isLoadingMore = true;
    const result = await fetchData(page.value + 1, page_size.value);
    console.log('result', result);
    if (result?.length) {
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
    onScroll,
    changeTab,
  };
}

export type ScrollViewContext = ReturnType<typeof useScrollView>;
export const ScrollViewKey: InjectionKey<ScrollViewContext> = Symbol('ScrollView');
