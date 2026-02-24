import type { Article } from '../pages/tagPage/type';

export type ArticleType = Article;

export enum TimeFilter {
  All = 'all',
  Week = 'week',
  Month = 'month',
  Year = 'year',
  Newest = 'newest',
  Recommend = 'recommend',
}
