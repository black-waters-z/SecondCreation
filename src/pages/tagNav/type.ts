export interface Tag {
  id: number;
  name: string;
  type: 'work' | 'character' | 'cross';
  description?: string;
  created_at?: string;
}

export const introduction = {
  work: '作品',
  character: '角色',
  cross: 'cp标签',
};
