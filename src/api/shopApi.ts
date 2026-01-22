import { get } from '@/utils/request';
import type { GoodInfos } from '@/pages/buyGood/type';
import type { goodInfo as shopGood } from '@/pages/shopping/type';
export async function getGoodPageInfo(good_id: number): Promise<GoodInfos> {
  // 获取商品信息
  const headInfo = await get(`/goods/${good_id}`);
  return headInfo;
}

export async function getGoodsInfo(page_num: number, page_size: number): Promise<shopGood[]> {
  const result = await get(`/goods/?page=${page_num}&page_size=${page_size}`);
  return result.items;
}

export async function getGoodsComments(page: number) {
  const result = await get(`/good-comments/by-likes?page=${page}`);
  return result.items;
}
