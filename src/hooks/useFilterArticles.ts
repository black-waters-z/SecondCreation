import { getTagPageData, type queryArticleKey } from '@/api/tagApi';
import { type TagPageData } from '@/pages/tagPage/type';
import { onLoad } from '@dcloudio/uni-app';
import { ref, toRefs } from 'vue';

export function useFilterArticles(list: Record<string, any>[]) {
  const queryKey = ref<queryArticleKey>();
  onLoad(async (options) => {
    tagParam = options?.tag;
    if (tagParam) {
      queryKey.value = {
        tag_ids: [Number(tagParam)],
        order_by: '-total_score',
        peroid: 'newest',
        page: 1,
        per_page: 10,
      };
      result.value = (await getTagPageData(queryKey.value)) as TagPageData;
    }
  });

  let tagParam: string | undefined;
  const result = ref<TagPageData>();

  async function toggleArticle(idx: number) {
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

  return toRefs({
    result,
    toggleArticle,
    startFilterArticles,
  });
}
