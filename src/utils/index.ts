const info = uni.getSystemInfoSync();
export const isMobile = info.platform === 'android' || info.platform === 'ios' || info.deviceType === 'phone' || info.windowWidth <= 600;
