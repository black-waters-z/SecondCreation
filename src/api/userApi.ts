import type { UserInfo } from '@/pages/user/type';
import { get, post } from '@/utils/request';

// 获取当前用户信息
export async function getUserMeInfo(): Promise<UserInfo> {
  return await get('/users/me');
}

// 修改用户密码

// 获取用户关注对象
export async function getUserFollows(page: number): Promise<UserInfo[]> {
  return (await get(`/users/attentions?page=${page}`)).items;
}

// 切换关注
export async function toggleAttention(following_id: number) {
  const result = await post(`/users/attentions?following_id=${following_id}`);
  uni.showToast({
    title: result.msg,
    duration: 2000,
  });
}
