import type { Collection } from '@/pages/post/index';
import type { CollectionData } from '@/components/common/UserInfoCollections/type';
import { get, post } from '../utils/request';
import { type ManageArticle } from '@/components/icon/ArticleManagerComponent/type';
import { type UserInfo } from '@/pages/user/type';
export async function getCollectionListInPost(): Promise<Collection[]> {
  return await get('/collections');
}

// userInfo页面获取合集信息
export async function getUserInfoCollection(): Promise<CollectionData[]> {
  return await get('/collections?page=1&page_size=10');
}

// 获取合集内部存放的articles
export interface CollectionArticleWithUserOut {
  user: UserInfo;
  items: ManageArticle[];
}
export async function getCollectionArticles(collection_id: number, page: number = 1, page_size: number = 10): Promise<CollectionArticleWithUserOut> {
  return await get(`/collections/articles?collection_id=${collection_id}&page=${page}&page_size=${page_size}`);
}

export interface CreateCollection {
  name: string;
  image_url?: string;
  description?: string;
}
export async function postCollection(collectionIn: CreateCollection): Promise<number> {
  const result = await post('/collections', collectionIn);
  return result.id;
}
