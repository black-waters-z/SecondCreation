import type { Article } from '../tagPage/type';
import type { UserInfo } from '../user/type';

export interface ArticlePageData {
  article: Article;
  userInfo: UserInfo;
  collection?: ArticleCollectionInfo;
}

export interface ArticleCollectionInfo {
  id: number;
  name: string;
  previous?: {
    id: number;
    title: string;
  };
  next?: {
    id: number;
    title: string;
  };
}

export interface Collection {
  id: number;
  name: string;
  description: string;
  articles: Article[];
}
