interface path {
  path: string;
}

export interface ArticleData {
  title: string;
  content: string;
  date?: string;
  author: string;
  tags: string[];
  id: string;
  views?: number;
  likes?: number;
  comments?: number;
  description: string;
  article_url: path;
  author_url: path;
}

export interface Collection {
  id: number;
  name: string;
  description?: string;
}

export interface FormData {
  title: string;
  content: string;
  collection: number;
  image_urls: string[];
}
