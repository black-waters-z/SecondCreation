import type { CommentInfo } from '@/components/shop/comment/type';
export enum shopTab {
  paint = '画作制品',
  write = '文字制品',
  toy = '棉花制品',
  comment = '评价',
}

export interface commentsInfo {
  comments: CommentInfo[];
}

export interface goodInfo {
  id: number;
  goodImg: string;
  title: string;
  store?: {
    avatar: string;
    name: string;
  };
  has_been_favorited: boolean;
}
