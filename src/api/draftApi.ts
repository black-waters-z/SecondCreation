import { del, get, post } from '@/utils/request';
import type { DraftList, DraftListItem } from '@/components/icon/DraftComponent/type';
import { type Article } from '@/pages/tagPage/type';
export async function getDraftArticleList(page: number, page_size: number): Promise<DraftList> {
  const result = await get(`/drafts/items?page=${page}&page_size=${page_size}`);
  return result;
}

export async function getDraftById(draft_id: number): Promise<DraftListItem> {
  const result = await get(`/drafts/${draft_id}`);
  return result;
}

export async function addDraft(draft: DraftListItem): Promise<void> {
  await post(`/drafts`, draft);
}

export async function deleteDraftById(draft_id: number): Promise<void> {
  await del('/drafts/' + draft_id);
}
