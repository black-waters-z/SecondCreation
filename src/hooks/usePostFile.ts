import { computed, provide, ref, watch } from 'vue';
import type { Ref } from 'vue';

export function usePostPicFile() {
  interface FileItem {
    url: string;
    status?: string;
    message?: string;
    [key: string]: any;
  }

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

  const uploadFilePromise = (url: string, name: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      let config = { url: 'http://localhost:8080/upload-image-file', name: 'image' };
      const extension = name.split('.').pop()?.toLowerCase();
      if (extension && ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv'].includes(extension)) {
        config = { url: 'http://localhost:8080/upload-video-file', name: 'video' };
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
    console.log(lists);
    for (let i = 0; i < lists.length; i++) {
      try {
        const result = await uploadFilePromise(lists[i].url, lists[i].name);
        const item = fileListRef.value[fileListLen + i];

        fileListRef.value.splice(fileListLen + i, 1, {
          ...item,
          status: 'success',
          message: '',
          url: result,
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

  const url_images = computed(() => {
    return fileList3.value.map((item) => item.url);
  });

  return { fileList3, fileListPicture, fileListOther, deletePic, afterRead };
}
