import type { goodInfo } from '@/pages/shopping/type';
export interface CommentInfo {
  user: User;
  comment: Comment;
  icons: Array<iconWithNum | string[]>;
  storeInfo?: {
    storeOwner: {
      name: string;
      avatar: string;
    };
    Goods: goodInfo[];
  };
}

interface iconWithNum {
  type: string[];
  num: number;
}

interface Comment {
  id: number;
  content: string;
  createTime: string;
  likeCount: string;
  parentId?: number;
  userId?: number;
  hasBeenLiked?: boolean;
}

interface User {
  id: string;
  username: string;
  avatarUrl: string;
}
