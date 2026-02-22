export interface DraftListItem {
  id: number;
  title: string;
  subTitle: string;
  content: string;
  img: string[];
  created_at: string;
  updatedAt?: string;
}

export type DraftList = DraftListItem[];
