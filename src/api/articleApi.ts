import { get } from '@/utils/request';
import type { Article } from '@/pages/tagPage/type';
import type { ArticlePageData } from '@/pages/article/type';
export async function getRecommenedArticles(): Promise<Article[]> {
  const result = await get('/articles/recommendations');
  return result;
}

export async function searchArticle(keyword: string): Promise<Article[]> {
  const result = await get(`/articles/search?keyword=${keyword}`);
  return result;
}

// 按照热度根据页数，时间范围等查询
export async function getFilterArticle(page: number): Promise<Article[]> {
  const result = await get(`/articles/get-filter-articles?page=${page}`);
  return result.items;
}

export async function getFavoriteArticles(): Promise<Article[]> {
  const result = await get('/articles/favorites?page=1');
  return result;
}

export async function getArticleById(article_id: number): Promise<ArticlePageData> {
  const result = await get(`/articles/${article_id}/with-status`);
  return result;
}
