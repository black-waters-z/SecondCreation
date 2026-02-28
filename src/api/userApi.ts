import { type UserChange } from '@/components/icon/SettingComponent/type';
import type { UserInfo } from '@/pages/user/type';
import { get, post, put } from '@/utils/request';

// 获取当前用户信息
export interface UserInfoWithFollow extends UserInfo {
  email?: string;
  following: boolean;
}
export async function getUserMeInfo(user_id?: number): Promise<UserInfoWithFollow> {
  if (!user_id) return await get('/users/me');
  return await get(`/users/me?input_user_id=${user_id}`);
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

// 刷新token
export async function refreshToken(): Promise<string> {
  // 获取本地已过期的token，发送给后端
  // 查有没有这个人，然后返回token
  const token = uni.getStorageSync('token');
  const result = await get('/users/token/refresh-token?token=' + token);
  return result.access_token;
}

export async function changeUserFunc(formData: UserChange): Promise<{ message: string }> {
  const result = await put(`/users`, formData);
  return result;
}
