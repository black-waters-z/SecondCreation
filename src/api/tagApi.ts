import { get } from '@/utils/request';
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

async function fromTagGetArticleList(tagId: string): Promise<Article[]> {
  const result = await get(`/articles/from_tag_get?tag_id=${tagId}`);
  return result;
}

async function getNavTagRelation(tagId: string): Promise<NavTabTag> {
  const result = await get(`/tag-relations/get_work_tags?other_tag_id=${tagId}`);
  return result;
}

export async function getTagPageData(tagId: string): Promise<TagPageData> {
  const navTags = await getNavTagRelation(tagId);
  const articleList = await fromTagGetArticleList(tagId);
  return { navTags, articleList };
}
