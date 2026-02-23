import { get } from '@/utils/request';
import type { DraftList } from '@/components/icon/DraftComponent/type';
export async function getDraftArticleList(page: number, page_size: number): Promise<DraftList> {
  const result = await get(`/drafts/items?page=${page}&page_size=${page_size}`);
  return result;
}
