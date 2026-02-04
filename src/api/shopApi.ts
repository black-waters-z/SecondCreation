import { get, post, del } from '@/utils/request';
import type { GoodInfos, cartAddChoice } from '@/pages/buyGood/type';
import type { goodInfo as shopGood } from '@/pages/shopping/type';
import type { CommentInfo } from '@/components/shop/comment/type';
import type { goodInfo } from '@/pages/shopping/type';
import type { goodChoiceAdd } from '@/pages/shoppingCart/type';
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

interface CommentsByCommentId {
  comment: CommentInfo;
  replies: {
    total: number;
    page: number;
    pageSize: number;
    items: CommentInfo[];
  };
  storeInfo?: {
    storeOwner: {
      name: string;
      avatar: string;
    };
    Goods: goodInfo[];
  };
}
export async function getCommentsByCommentId(comment_id: number): Promise<CommentsByCommentId> {
  const result = await get(`/good-comments/${comment_id}?page=1`);
  return result;
}

export async function getCartGoodChoices(): Promise<goodChoiceAdd[]> {
  const result = await get('/cart/items');
  return result.items;
}

export async function addCartGoodChoice(data: cartAddChoice): Promise<void> {
  try {
    await post('/cart/items', data);
    uni.showToast({
      title: '加入购物车成功',
    });
  } catch (error) {
    uni.showToast({
      title: '加入购物车失败',
    });
  }
}

export async function deleteCartGoodChoice(goodChoiceId: number): Promise<void> {
  try {
    await del('/cart/items/' + goodChoiceId);
    uni.showToast({
      title: '删除成功',
    });
  } catch (error) {
    uni.showToast({
      title: '删除失败',
    });
  }
}
