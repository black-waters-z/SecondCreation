import type { Collection } from '@/pages/post/index';
import type { CollectionData } from '@/components/common/UserInfoCollections/type';
import { get, post } from '../utils/request';
import { type ManageArticle } from '@/components/icon/ArticleManagerComponent/type';
import { type UserInfo } from '@/pages/user/type';
export async function getCollectionListInPost(): Promise<Collection[]> {
  return await get('/collections');
}

// userInfo页面获取合集信息
export async function getUserInfoCollection(user_id?: number): Promise<CollectionData[]> {
  if (!user_id) {
    return await get(`/collections?page=1&page_size=10`);
  }
  return await get(`/collections?page=1&page_size=10&input_user_id=${user_id}`);
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

// 获取总，年月日最热的合集前十个
export async function getHotCollection(page: number, page_size: number): Promise<Record<'all' | 'year' | 'month' | 'week', CollectionData[]>> {
  return await get(`/collections/list_hot_collection?page=${page}&page_size=${page_size}`);
}
