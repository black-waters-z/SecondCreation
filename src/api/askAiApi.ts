import { post } from '@/utils/request';

interface ChatWithAiParams {
  message: string;
  model: string;
  max_tokens: number;
  temperature: number;
  top_k: number;
}
export async function chatWithAi(key: ChatWithAiParams) {
  const result = await post('/chat', { ...key, session_id: null });
  return result.message;
}
