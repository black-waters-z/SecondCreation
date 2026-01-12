import type { Tag } from '@/pages/tagNav/type';
import type { NavTabTag } from '@/components/base/NavTab/type';

export interface Article {
  id: number;
  title: string;
  author?: string;
  subtitle: string | null;
  content: string;
  image_urls: string[];
  view_count: number;
  like_count: number;
  favorite_count: number;
  reward_amount: string;
  status: 'draft' | 'published' | 'archived';
  created_at: string;
  updated_at: string;
  published_at: string | null;
  tags?: Tag[];
}

export interface TagPageData {
  navTags: NavTabTag;
  articleList: Article[];
}
