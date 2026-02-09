import type { ChildComment, FirstComment } from '@/pages/article/type';
import { get, post } from '@/utils/request';

export async function getArticleCommentList(articleId: number): Promise<FirstComment[]> {
  const data = await get(`/comments?article_id=${articleId}&page=1`);
  return data.items;
}

// 从父评论id分页获取子评论
export async function getChildCommentListByCommentId(parent_id: number): Promise<ChildComment[]> {
  const data = await get(`/comments/childComment?parent_id=${parent_id}&page=1&page_size=10&order_by=created_at`);
  return data;
}

// 发布文章评论
interface PostCommentParams {
  content: string;
  article_id: number;
  parent_id?: number | undefined;
}

interface PostCommentResult {
  comment_id: number;
  grand_parent_id: number | null;
  user: {
    id: number;
    name: string;
    avatar: string;
  };
}
export async function postCommentFunction(data: PostCommentParams): Promise<PostCommentResult> {
  return await post('/comments', data);
}
