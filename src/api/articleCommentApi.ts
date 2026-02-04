import type { ChildComment, FirstComment } from '@/pages/article/type';
import { get } from '@/utils/request';

export async function getArticleCommentList(articleId: number): Promise<FirstComment[]> {
  const data = await get(`/comments?article_id=${articleId}&page=1`);
  return data.items;
}

// 从父评论id分页获取子评论
export async function getChildCommentListByCommentId(parent_id: number): Promise<ChildComment[]> {
  const data = await get(`/comments/childComment?parent_id=${parent_id}&page=1&page_size=10&order_by=created_at`);
  return data;
}
