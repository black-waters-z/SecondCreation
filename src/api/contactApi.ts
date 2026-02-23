import { type ContactToMeData } from '@/components/icon/ContactToMeComponent/type';
import { get } from '@/utils/request';

export interface ContactReturn {
  favorite: ContactToMeData[];
  like: ContactToMeData[];
  comment: ContactToMeData[];
  tip?: ContactToMeData[];
  follow?: ContactToMeData[];
}
export async function getContactNewData(): Promise<ContactReturn> {
  return await get(`/contact/new`);
}
