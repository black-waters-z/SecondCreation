import type { UserInfo } from '@/pages/user/type';
import { get } from '@/utils/request';

// 获取当前用户信息
export async function getUserMeInfo(): Promise<UserInfo> {
  return await get('/users/me');
}

// 修改用户密码
