<template>
    <view class="w-full"></view>
</template>

<script setup lang="ts">
// Prepare your video URL
const videoUrl =
    'http://localhost:8080/static/upload_Video/5fad959785ae4481bfd81374a7918214.mp4';

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
    const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, 'image/jpeg', 0.95)
    );

    if (!blob) throw new Error('canvas toBlob failed');

    const file = new File([blob], 'video_cover.jpg', {
        type: 'image/jpeg',
        lastModified: Date.now(),
    });

    // Upload with uni.uploadFile
    const uploadResult = await new Promise<UniApp.UploadFileSuccessCallbackResult>(
        (resolve, reject) => {
            // H5 supports File objects via "files"
            // #ifdef H5
            uni.uploadFile({
                url: 'http://localhost:8080/upload-image-file',
                name: 'image',
                files: [{ name: 'image', file }],
                formData: { type: 'multipart/form-data' },
                success: resolve,
                fail: reject,
            });
            // #endif

            // Non-H5 should pass a filePath string (temp file path)
            // #ifndef H5
            uni.uploadFile({
                url: 'http://localhost:8080/upload-image-file',
                name: 'image',
                filePath: (file as unknown as string),
                formData: { type: 'multipart/form-data' },
                success: resolve,
                fail: reject,
            });
            // #endif
        }
    );

    console.log('Upload cover result:', uploadResult);
} catch (error) {
    console.error('Process failed:', error);
}
</script>
