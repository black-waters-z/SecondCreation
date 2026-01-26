import type { Article } from '../tagPage/type';
import type { UserInfo } from '../user/type';

export interface ArticlePageData {
  article: Article;
  userInfo: UserInfo;
}
