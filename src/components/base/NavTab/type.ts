import type { Tag } from '@/pages/tagNav/type';
export interface NavTab {
  name: string;
}

export interface NavTabTag {
  work_tags: Tag[];
  other_tag: Tag;
}
