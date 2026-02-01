import type { Collection } from '@/pages/post/index';
import { get } from '../utils/request';
export async function getCollectionListInPost(): Promise<Collection[]> {
  return await get('/collections');
}
