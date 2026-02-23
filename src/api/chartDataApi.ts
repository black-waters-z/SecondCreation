import { type ArticleDatas } from '@/components/icon/ArticleDataComponent/type';
import { get } from '@/utils/request';

export async function getArticleData(page: number, page_size: number): Promise<ArticleDatas> {
  return await get(`/article_data/stats_list?page=${page}&size=${page_size}`);
}
