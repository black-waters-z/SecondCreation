import { get, post } from '@/utils/request';
import type { Article } from '@/pages/tagPage/type';
import type { ArticlePageData } from '@/pages/article/type';
import type { ManageArticle } from '@/components/icon/ArticleManagerComponent/type';
import type { queryArticleKey } from './tagApi';
export async function getRecommenedArticles(): Promise<Article[]> {
  const result = await get('/articles/recommendations');
  return result;
}

export async function searchArticle(search_keys: queryArticleKey): Promise<Article[]> {
  const result = await post(`/articles/filter_and_search_articles`, search_keys);
  return result;
}

// 按照热度根据页数，时间范围等查询
export async function getFilterArticle(page: number): Promise<Article[]> {
  const result = await get(`/articles/get-filter-articles?page=${page}`);
  return result;
}

export async function getFavoriteArticles(page: number, page_size: number, user_id?: number): Promise<Article[]> {
  if (!page || !page_size) return;
  let path;
  if (!user_id) {
    path = `/articles/favorites?page=${page}&page_size=${page_size}`;
  } else {
    path = `/articles/favorites?page=${page}&page_size=${page_size}&user_id=${user_id}`;
  }
  const result = await get(path);
  return result;
}

export async function changeArticleFavorite(article_id: number) {
  await post('/articles/favorite/' + article_id);
}
export async function getLikeArticles(): Promise<Article[]> {
  const result = await get('/articles/likes?page=1');
  return result;
}

export async function changeArticleLike(article_id: number) {
  await post('/articles/like/' + article_id);
}
export async function getArticleById(article_id: number): Promise<ArticlePageData> {
  const result = await get(`/articles/${article_id}/with-status`);
  return result;
}

// manage-article：获取用户自身发布的文章

export async function getManageArticleList(page: number, page_size: number): Promise<ManageArticle[]> {
  const result = await get(`/articles/mine/statistics?page=${page}&page_size=${page_size}`);
  return result.items;
}

// 获取用户所有的文章，文本前一百个字符
export async function getMineArticleList(page: number, page_size: number, user_id?: number): Promise<ManageArticle[]> {
  if (!user_id) {
    const result = await get(`/articles/mine/statistics?page=${page}&page_size=${page_size}&get_content=true`);
    return result.items;
  }
  const result = await get(`/articles/mine/statistics?page=${page}&page_size=${page_size}&user_id=${user_id}&get_content=true`);
  return result.items;
}
