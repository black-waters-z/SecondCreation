import { computed, ref, watch } from 'vue';
import type { Ref } from 'vue';
import { useLoadVideo } from './useLoadVideo';

export interface FileItem {
  url: string;
  coverUrl?: string;
  status?: string;
  message?: string;
  [key: string]: any;
}

export function usePostPicFile() {
  const { loadVideo, videoUpload, uploadProgress, stopUpload, continueUpload } = useLoadVideo();
  const popShow = ref(false);
  const fileList3 = ref<FileItem[]>([]);
  const fileListPicture = ref<FileItem[]>([]);
  const fileListOther = ref<FileItem[]>([]);

  const fileListMap: Record<string, Ref<FileItem[]>> = {
    fileList3,
    fileListpicture: fileListPicture,
    fileListother: fileListOther,
  };

  const buildKey = (name: string) => `fileList${name.toLowerCase()}`;

  const deletePic = (event: { name: string; index: number }) => {
    const fileListKey = buildKey(event.name);
    const fileListRef = fileListMap[fileListKey];
    if (fileListRef) {
      fileListRef.value.splice(event.index, 1);
      return;
    }
    console.error(`File list ${fileListKey} not found`);
  };

  // 上传文件的promise包装
  const uploadFilePromise = (url: string, name: string) => {
    return new Promise((resolve, reject) => {
      let config = { url: import.meta.env.VITE_API_BASE + '/upload-image-file', name: 'image' };
      const extension = name.split('.').pop()?.toLowerCase();
      if (extension && ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv'].includes(extension)) {
        config = { url: import.meta.env.VITE_API_BASE + '/upload-video-file', name: 'video' };
      }
      uni.uploadFile({
        ...config,
        filePath: url,
        success: (res: any) => {
          try {
            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
            resolve(data?.data ?? data?.filename ?? data);
          } catch (e) {
            resolve(res.data);
          }
        },
        fail: (err: any) => {
          reject(err);
        },
      });
    });
  };

  // 临时读取文件，再上传文件
  const afterRead = async (event: { name: string; file: FileItem | FileItem[] }) => {
    // when multiple=true file is an array; otherwise it's a single object
    const lists: FileItem[] = Array.isArray(event.file) ? [...event.file] : [event.file];
    const fileListKey = buildKey(event.name);
    const fileListRef = fileListMap[fileListKey];
    if (!fileListRef) {
      console.error(`File list ${fileListKey} not found`);
      return;
    }

    const fileListLen = fileListRef.value.length;

    // mark items as uploading
    lists.forEach((item) => {
      fileListRef.value.push({
        ...item,
        status: 'uploading',
        message: 'uploading',
      });
    });
    // console.log(lists);
    for (let i = 0; i < lists.length; i++) {
      try {
        let result;
        let item;

        // 判断文件是否是视频格式，是，则进入if判断生成封面图，push入数组
        // 如果是图片文件，直接使用uni.uploadFile上传，如果是视频文件，使用另一个hook里面的多文件切片上传功能。
        let res;
        if (lists[i].type === 'video') {
          popShow.value = true;
          // console.log('file', lists[i].file.tempFile);
          result = await videoUpload(lists[i].file.tempFile);
          // 开始生成封面图
          if (!result) return;
          res = await loadVideo(import.meta.env.VITE_VIDEO_BASE + result);
          uni.showToast({ title: '生成封面图成功', icon: 'success' });
          popShow.value = false;
        } else if (lists[i].type === 'image') {
          result = (await uploadFilePromise(lists[i].url, lists[i].name)) as string;
          item = fileListRef.value[fileListLen + i];
        } else {
          throw new Error('未知文件类型');
        }

        fileListRef.value.splice(fileListLen + i, 1, {
          ...item,
          status: 'success',
          message: '',
          url: result,
          coverUrl: res,
        });
      } catch (error) {
        console.error('Upload failed:', error);
        const item = fileListRef.value[fileListLen + i];

        fileListRef.value.splice(fileListLen + i, 1, {
          ...item,
          status: 'failed',
          message: 'upload failed',
        });
      }
    }
  };

  watch(
    () => fileList3.value,
    () => {
      console.log('fileList3', fileList3.value);
    },
    { deep: true },
  );

  return { fileList3, fileListPicture, fileListOther, deletePic, afterRead, uploadProgress, popShow, stopUpload, continueUpload };
}
