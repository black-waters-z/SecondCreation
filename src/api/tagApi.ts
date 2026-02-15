import { get, post } from '@/utils/request';
import type { NavTabTag } from '@/components/base/NavTab/type';
import type { TagPageData, Article } from '@/pages/tagPage/type';
import type { Tag } from '@/pages/tagNav/type';

async function getTag(tagId: string): Promise<Tag> {
  const result = await get(`/tags/${tagId}`);
  return result;
}

interface ListTag {
  total: number;
  items: Tag[];
}
export async function listTags(tagType: 'work' | 'character' | 'cross', all: boolean): Promise<ListTag> {
  const result = await get(`/tags/?tag_type=${tagType}&all=${all}`);
  return result;
}

export interface queryArticleKey {
  keyword?: string;
  tag_ids?: number[];
  order_by: '-total_score' | 'total_score';
  time_range?: Date[];
  peroid?: 'all' | 'week' | 'month' | 'year' | 'newest' | 'recommend';
  page: number;
  per_page: number;
}
async function fromTagGetArticleList(queryKey: queryArticleKey): Promise<Article[]> {
  const result = await post(`/articles/filter_and_search_articles`, queryKey);
  return result;
}

async function getNavTagRelation(tagId?: number): Promise<NavTabTag | undefined> {
  if (tagId) {
    const result = await get(`/tag-relations/get_work_tags?other_tag_id=${tagId}`);
    return result;
  }
}

export async function getTagPageData(queryKey: queryArticleKey): Promise<TagPageData> {
  const navTags = await getNavTagRelation(queryKey.tag_ids?.[0]);
  const articleList = await fromTagGetArticleList(queryKey);
  return { navTags, articleList };
}
