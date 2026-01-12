import { get } from '@/utils/request';
import type { Article } from '@/pages/tagPage/type';
export async function getRecommenedArticles(): Promise<Article[]> {
  const result = await get('/articles/recommendations');
  return result;
}

export async function searchArticle(keyword: string): Promise<Article[]> {
  const result = await get(`/articles/search?keyword=${keyword}`);
  return result;
}
