import { defineStore } from 'pinia';
import { onMounted, ref } from 'vue';
import { parseToken } from '@/utils/security';

export const useAiAskStore = defineStore('aiAsk', () => {
  // 之后会有功能定制ai人物
  //   比如说，在这里放置gif的链接ref，放置角色的ref，然后传入到提问之中
  //   接入清空之前对话的功能
  // 获取AI的答案
  const has_ask_first = ref(false);
  const dialogs = ref<string>();
  const askAiQuestion = ref('');
  const size = 150; // 组件宽高(px)
  const x = ref(0);
  const y = ref(0);

  let startOffsetX = 0;
  let startOffsetY = 0;
  let maxX = 0;
  let maxY = 0;

  const initBoundary = () => {
    const info = uni.getSystemInfoSync();
    maxX = info.windowWidth - size;
    maxY = info.windowHeight - size;
    x.value = maxX - size;
    y.value = maxY - 400;
  };
  initBoundary();

  const onTouchStart = (e: any) => {
    isDragging = true;
    // 初始化鼠标位置
    startOffsetX = e.clientX - x.value;
    startOffsetY = e.clientY - y.value;

    // 阻止默认行为，避免选中文字等
    e.preventDefault();
  };

  const onTouchMove = (e: any) => {
    if (!isDragging) return; // ← 这一行确保只有 mousedown 后才能 move

    let nextX = e.clientX - startOffsetX;
    let nextY = e.clientY - startOffsetY;

    nextX = Math.max(0, Math.min(nextX, maxX));
    nextY = Math.max(0, Math.min(nextY, maxY));

    x.value = nextX;
    y.value = nextY;
    e.preventDefault();
  };
  let isDragging = false;
  const onMouseDown = (e: any) => {
    isDragging = true;
    // 初始化鼠标位置
    startOffsetX = e.clientX - x.value;
    startOffsetY = e.clientY - y.value;

    // 阻止默认行为，避免选中文字等
    e.preventDefault();
  };
  const onMouseMove = (e: any) => {
    if (!isDragging) return; // ← 这一行确保只有 mousedown 后才能 move

    let nextX = e.clientX - startOffsetX;
    let nextY = e.clientY - startOffsetY;

    nextX = Math.max(0, Math.min(nextX, maxX));
    nextY = Math.max(0, Math.min(nextY, maxY));

    x.value = nextX;
    y.value = nextY;
    e.preventDefault();
  };

  const onMouseUp = () => {
    if (!isDragging) return;
    isDragging = false;
    // handleEnd();
  };

  // const onTouchEnd = () => {
  //     // 可选：吸边
  //     x.value = x.value < maxX / 2 ? 0 : maxX;
  // };
  const isThinking = ref(false);
  //   async function askAi(content?: string) {
  //     if (!askAiQuestion.value && !content) return;
  //     // 开始接入接口
  //     const pushKey = {
  //       message: content ?? askAiQuestion.value,
  //       model: 'spark-x',
  //       max_tokens: 32768,
  //       temperature: 1.2,
  //       top_k: 6,
  //     };
  //     isThinking.value = true;
  //     askAiQuestion.value = '';
  //     const result = await chatWithAi(pushKey);
  //     dialogs.value = result.replace(/[()（）](.*?)[)）]/g, ''); // ✅ 兼容版本
  //     isThinking.value = false;
  //   }

  const messages = ref();

  function askAiWithStream(content?: string) {
    console.log('askAiWithStream', askAiQuestion.value);
    if (!content && !askAiQuestion.value) return;

    isThinking.value = true;
    askAiQuestion.value = '';
    messages.value = '';

    const token = uni.getStorageSync('token');
    const uid = parseToken(token).uid;
    const text = content || askAiQuestion.value;
    const encoded = encodeURIComponent(text);

    const url = `${import.meta.env.VITE_API_BASE}/chat-stream?message=${encoded}&user_id=${uid}`;

    const es = new EventSource(url);

    // 连接成功
    es.onopen = () => {
      console.log('SSE connected');
    };

    // 监听自定义 event: message
    es.addEventListener('message', (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === 'chunk') {
          setTimeout(() => {
            messages.value += data.content;
          }, 100);
          //   messages.value += data.content;
        }

        if (data.type === 'complete') {
          console.log('AI完成:', messages.value);
          isThinking.value = false;
          es.close();
        }
      } catch (err) {
        console.error('解析错误', err);
      }
    });

    es.onerror = (err) => {
      console.error('SSE error', err);
      isThinking.value = false;
      es.close();
    };
  }

  onMounted(async () => {
    if (has_ask_first.value) return;
    askAiWithStream('不准输出()（）内文字，模仿恩奇都的语气说话，只说话，例如：(心理描写)（描写）,你不应该输出这些');
    has_ask_first.value = true;
  });

  return {
    x,
    y,
    // askAi,
    dialogs,
    isThinking,
    askAiQuestion,
    messages,
    askAiWithStream,
    onTouchMove,
    onTouchStart,
    onMouseDown,
    onMouseMove,
    onMouseUp,
  };
});
