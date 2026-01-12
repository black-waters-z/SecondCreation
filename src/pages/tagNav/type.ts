export interface Tag {
  id: number;
  name: string;
  type: 'work' | 'character' | 'cross';
  description?: string;
  created_at?: string;
}
