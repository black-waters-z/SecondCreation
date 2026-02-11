interface ArticleDataType {
  label: string;
  count: number;
}

export interface ArticleDataDict {
  [key: string]: {
    like: ArticleDataType[];
    favorite: ArticleDataType[];
    comment: ArticleDataType[];
  };
}

export type ArticleDatas = ArticleDataDict[][];
