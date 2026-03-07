import { getTagPageData, getNavTagRelation, type queryArticleKey } from '@/api/tagApi';
import { type TagPageData } from '@/pages/tagPage/type';
import { onLoad } from '@dcloudio/uni-app';
import { type Ref, ref, toRefs } from 'vue';
import GridArticlesContainer from '@/components/common/GridArticlesContainer/index.vue';
import { type NavTabTag } from '@/components/base/NavTab/type';
export function useFilterArticles(list: Record<string, any>[], gridArticle?: Ref<InstanceType<typeof GridArticlesContainer> | null>) {
  const queryKey = ref<queryArticleKey>();
  // 获取标签关系
  const tags = ref<NavTabTag>();

  onLoad(async (options) => {
    tagParam = options?.tag;
    tags.value = await getNavTagRelation(Number(tagParam));
    const tagParamWork = tags?.value?.work_tags?.[0]?.id;
    if (tagParam) {
      queryKey.value = {
        tag_ids: [Number(tagParam)],
        order_by: '-total_score',
        peroid: 'newest',
        page: 1,
        per_page: 10,
      };
      if (tagParamWork) {
        queryKey.value.must_have_ids = [tagParamWork];
      }
      result.value = (await getTagPageData(queryKey.value)) as TagPageData;
    }
  });

  let tagParam: string | undefined;
  const result = ref<TagPageData>();

  async function changeTagArticle(workTagId: number) {
    if (gridArticle?.value) gridArticle.value.reset();
    if (tagParam) {
      queryKey.value = {
        tag_ids: [Number(tagParam)],
        must_have_ids: [workTagId],
        order_by: '-total_score',
        peroid: 'newest',
        page: 1,
        per_page: 10,
      };
      result.value = (await getTagPageData(queryKey.value)) as TagPageData;
    }
  }

  async function toggleArticle(idx: number) {
    if (gridArticle?.value) gridArticle.value.reset();
    if (tagParam) {
      queryKey.value = {
        tag_ids: [Number(tagParam)],
        order_by: '-total_score',
        peroid: list[idx].peroid as 'all' | 'week' | 'recommend' | 'newest' | 'year' | 'month',
        page: 1,
        per_page: 10,
      };
      result.value = (await getTagPageData(queryKey.value)) as TagPageData;
    }
  }

  async function startFilterArticles(value: queryArticleKey) {
    queryKey.value = {
      tag_ids: [Number(tagParam)],
      keyword: value.keyword,
      order_by: '-total_score',
      time_range: value.time_range,
      page: 1,
      per_page: 10,
    };
    console.log('queryKey:', queryKey.value);
    result.value = (await getTagPageData(queryKey.value)) as TagPageData;
  }

  return {
    result,
    toggleArticle,
    startFilterArticles,
    changeTagArticle,
  };
}
