export interface CommentInfo {
  user: User;
  comment: Comment;
  icons: Array<iconWithNum | string[]>;
}

interface iconWithNum {
  type: string[];
  num: number;
}

interface Comment {
  id: string;
  content: string;
  createTime: string;
  favorite: string;
  likes: string;
}

interface User {
  id: string;
  name: string;
  avatar: string;
}
