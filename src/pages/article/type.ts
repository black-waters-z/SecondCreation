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

export interface FirstComment {
  id: number;
  article_id: number;
  content: string;
  time: Date;
  like_count: number;
  reply_count: number;
  created_at: Date;
  user: {
    id: number;
    username: string;
    avatar_url: string;
  };
}

export interface ChildComment extends FirstComment {
  parent_id: number;
}
