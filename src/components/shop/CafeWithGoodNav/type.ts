import type { goodInfo } from '@/pages/shopping/type';

export interface storeInfo {
  storeOwner: {
    name: string;
    avatar: string;
  };
  Goods: goodInfo[];
}
