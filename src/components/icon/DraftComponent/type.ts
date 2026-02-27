export interface DraftListItem {
  id?: number;
  collection: number;
  title: string;
  subtitle: string;
  content: string;
  image_urls?: string[];
  created_at?: string;
  updatedAt?: string;
}

export type DraftList = DraftListItem[];
