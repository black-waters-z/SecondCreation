import type { Article } from '@/pages/tagPage/type';
import { searchArticle } from '@/api/articleApi';
import { TimeFilter } from '@/types';
import { type queryArticleKey } from '@/api/tagApi';
import { type Ref, ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import PageWrapper from '@/components/container/PageContainer.vue';
import GridArticlesContainer from '@/components/common/GridArticlesContainer/index.vue';

export function useFilterStoreArticles(pageWrapper: Ref<InstanceType<typeof PageWrapper> | null>, gridArticle: Ref<InstanceType<typeof GridArticlesContainer> | null>) {
  // define the default query key
  const queryKey = ref<queryArticleKey>({
    keyword: '',
    tag_ids: [],
    tag_names: [],
    must_have_ids: [],
    order_by: '-total_score',
    time_range: [],
    peroid: TimeFilter.Year,
    page: 1,
    per_page: 10,
  });

  const articleList = ref<Article[]>([]);

  // start load year page data
  onLoad(async () => {
    articleList.value = await searchArticle(queryKey.value);
  });

  // toggle tabs
  async function toggleData(timefilter: TimeFilter) {
    gridArticle.value?.reset();
    queryKey.value.peroid = timefilter;
    queryKey.value.page = 1;
    articleList.value = await searchArticle(queryKey.value);
    pageWrapper.value?.scrollView?.changeTab();
  }

  // scroll to load more
  async function fetchData(page: number) {
    queryKey.value.page = page;
    const next = await searchArticle(queryKey.value);
    articleList.value = [...next];
    return articleList.value;
  }

  async function filterArticles(query: queryArticleKey) {
    console.log('开始筛选:', query);
  }

  return {
    articleList,
    toggleData,
    fetchData,
    filterArticles,
    queryKey,
  };
}
