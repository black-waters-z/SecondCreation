export interface ManageArticle {
  id: number;
  title: string;
  like_count: number;
  favorite_count: number;
  comment_count: number;
  content?: string;
  image_urls?: string[];
  created_at?: string;
}
