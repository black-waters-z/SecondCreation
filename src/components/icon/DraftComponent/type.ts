export interface Craft {
  id: number;
  title: string;
  subTitle: string;
  content: string;
  img: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CraftListItem {
  id: number;
  title: string;
  updatedAt: string;
}

export interface CraftList {
  total: number;
  list: CraftListItem[];
}
