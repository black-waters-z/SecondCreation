import { post } from '@/utils/request';
import SparkMD5 from 'spark-md5';
import { ref } from 'vue';
export function useLoadVideo() {
  const CHUNK_SIZE = 5 * 1024 * 1024;
  // 上传进度
  const nowUploaded = ref(0);
  const uploadProgress = ref(0);
  const nowFile = ref<File>();
  const cancelToken = ref(false);
  const isUploading = ref(false);
  const nowHash = ref('');
  async function loadVideo(videoUrl?: string) {
    // 1) Create video element
    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.muted = true;
    video.playsInline = true;

    // 2) Create canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    try {
      // Wait for video metadata to load
      await new Promise((resolve, reject) => {
        video.addEventListener('loadedmetadata', resolve);
        video.addEventListener('error', reject);
        video.src = videoUrl;
      });

      // Seek to first frame
      video.currentTime = 0;

      await new Promise((resolve, reject) => {
        video.addEventListener('seeked', resolve);
        video.addEventListener('error', reject);
      });

      // Sync canvas size with video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw first frame
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert to blob
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.95));

      if (!blob) throw new Error('canvas toBlob failed');

      const file = new File([blob], 'video_cover.jpg', {
        type: 'image/jpeg',
        lastModified: Date.now(),
      });

      // Upload with uni.uploadFile
      const uploadResult = await new Promise<UniApp.UploadFileSuccessCallbackResult>((resolve, reject) => {
        // H5 supports File objects via "files"
        // #ifdef H5
        uni.uploadFile({
          url: import.meta.env.VITE_API_BASE + '/upload-image-file',
          name: 'image',
          files: [{ name: 'image', file }],
          formData: { type: 'multipart/form-data' },
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
        // #endif

        // Non-H5 should pass a filePath string (temp file path)
        // #ifndef H5
        uni.uploadFile({
          url: import.meta.env.VITE_API_BASE + '/upload-image-file',
          name: 'image',
          filePath: file as unknown as string,
          formData: { type: 'multipart/form-data' },
          success: resolve,
          fail: reject,
        });
        // #endif
      });

      return uploadResult;
    } catch (error) {
      console.error('Process failed:', error);
    }
  }
  // 开始对video切片
  function createChunks(file: File) {
    const chunks = [];
    let start = 0;

    while (start < file.size) {
      chunks.push(file.slice(start, start + CHUNK_SIZE));
      start += CHUNK_SIZE;
    }

    return chunks;
  }

  // 上传切片，首先转成file格式
  async function uploadChunk(chunk, index, hash) {
    return new Promise((resolve, reject) => {
      const chunkFile = new File([chunk], `chunk_${index}`, {
        type: chunk.type,
        lastModified: Date.now(),
      });

      uni.uploadFile({
        url: import.meta.env.VITE_API_BASE + '/upload/chunk',
        files: [{ name: 'file', file: chunkFile }],
        name: 'file',
        formData: {
          hash: hash,
          index: index,
        },
        success: (res) => {
          resolve(res);
        },
        // fail: reject,
        fail: (err) => {
          reject(err);
        },
      });
    });
  }

  // 获取文件hash唯一标识
  async function getFileHash(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = function (e) {
        try {
          const buffer = e.target?.result as ArrayBuffer;
          const spark = new SparkMD5.ArrayBuffer();
          spark.append(buffer);
          const hash = spark.end();
          console.log('文件信息:', {
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified,
            hash: hash,
          });
          resolve(hash);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = function () {
        reject(new Error('读取文件失败'));
      };

      reader.readAsArrayBuffer(file);
    });
  }

  async function videoUpload(file: File) {
    const chunks = createChunks(file);
    const hash = await getFileHash(file);
    // console.log('file', file);
    // console.log('hash', hash);
    nowFile.value = file;
    nowHash.value = hash;
    // 初始化任务
    if (nowUploaded.value === 0) {
      await post('/upload/init', {
        file_hash: nowHash.value,
        total_chunks: chunks.length,
      });
    }

    // 循环切片上传
    for (let i = nowUploaded.value; i < chunks.length; i++) {
      if (cancelToken.value) return;
      isUploading.value = true;
      await uploadChunk(chunks[i], i, hash);

      nowUploaded.value++;

      const progress = Math.floor((nowUploaded.value / chunks.length) * 100);
      uploadProgress.value = progress;
      console.log(`上传进度：${progress}%`);
    }

    const { msg, fileUrl } = await post('/upload/merge', {
      file_hash: hash,
    });
    nowUploaded.value = 0;
    uploadProgress.value = 0;
    isUploading.value = false;
    nowFile.value = undefined;
    nowHash.value = '';
    return fileUrl;

    // 最后return上传视频的地址，用hash来查接口
  }

  // // 显示上传进度
  // watch(
  //   () => [isUploading.value, uploadProgress.value],
  //   ([val1, val2]) => {
  //     if (!val1) return;
  //     uni.showLoading({
  //       title: '上传进度' + val2 + '%',
  //       // mask: true,
  //     });
  //   },
  // );

  async function stopUpload() {
    isUploading.value = false;
    cancelToken.value = true;
    uni.hideLoading();
  }

  async function continueUpload() {
    // 没有刷新的时候，还保存着file，保存进度再上传
    if (!nowFile.value) return;
    videoUpload(nowFile.value);
    cancelToken.value = false;
  }

  return { loadVideo, videoUpload, uploadProgress, stopUpload, continueUpload };
}
