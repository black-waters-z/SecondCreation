export interface ContactToMeData {
  username: string;
  userAction: '评论' | '点赞' | '收藏' | '打赏' | '关注';
  article: {
    id: number;
    title: string;
  };
  comment?: string;
  tip?: number;
  created_at: string;
}
