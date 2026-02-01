import { computed } from 'vue';

const info = uni.getSystemInfoSync();
export const isMobile = info.platform === 'android' || info.platform === 'ios' || info.deviceType === 'phone' || info.windowWidth <= 600;

export const getImageBaseUrl = computed(() => {
  return import.meta.env.VITE_IMAGE_BASE || 'http://localhost:8080/static/upload_IMG/';
});

export const getVideoBaseUrl = computed(() => {
  return import.meta.env.VITE_VIDEO_BASE || 'http://localhost:8080/static/upload_Video/';
});

export const getBaseFileUrl = computed(() => {
  return import.meta.env.VITE_API_BASE || 'http://localhost:8080/';
});
