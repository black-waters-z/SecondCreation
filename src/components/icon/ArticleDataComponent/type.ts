interface ArticleDataType {
  label: string;
  count: number;
}

export interface ArticleDataDict {
  article_id: number;
  article_name: string;
  [key: string]:
    | {
        like: ArticleDataType[];
        favorite: ArticleDataType[];
        comment: ArticleDataType[];
      }
    | number
    | string;
}

export type ArticleDatas = ArticleDataDict[][];
