// src/utils/request.ts

// 定义请求配置类型
interface RequestConfig {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS" | "HEAD";
  data?: any;
  header?: Record<string, string>;
  timeout?: number;
}

// 定义响应类型
interface UniResponse<T = any> {
  data: T;
  statusCode: number;
  header: Record<string, string>;
  cookies: string[];
}

const baseURL = import.meta.env.VITE_API_BASE || "/api";

const toFormUrlEncoded = (payload: Record<string, any>): string => {
  return Object.keys(payload)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(String(payload[key]))}`)
    .join("&");
};

// 统一的请求方法
export const request = <T = any>(config: RequestConfig): Promise<T> => {
  return new Promise((resolve, reject) => {
    const {
      url,
      method = "GET",
      data = {},
      header = {},
      timeout = 15000,
    } = config;

    // 处理完整的 URL
    const fullUrl = url.startsWith("http") ? url : `${baseURL}${url}`;

    // 设置请求头
    const headers = {
      "content-type": "application/json",
      // 可以在这里注入 token、平台信息等
      // 'Authorization': uni.getStorageSync('token') ? `Bearer ${uni.getStorageSync('token')}` : '',
      ...header,
    };

    const contentType = headers["content-type"] || (headers as any)["Content-Type"];
    const useForm =
      typeof contentType === "string" &&
      contentType.includes("application/x-www-form-urlencoded");
    const requestData =
      useForm && data && typeof data === "object" ? toFormUrlEncoded(data) : data;

    uni.request({
      url: fullUrl,
      method,
      data: requestData,
      header: headers,
      timeout,
      success: (res: any) => {
        // 状态码在 200-299 之间视为成功
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data);
        } else {
          // HTTP 状态码错误
          const error = new Error(`HTTP Error: ${res.statusCode}`);
          (error as any).statusCode = res.statusCode;
          (error as any).response = res;
          reject(error);
        }
      },
      fail: (err) => {
        // 网络错误等
        const error = new Error(err.errMsg || "Network Error");
        reject(error);
      },
    });
  });
};

// 请求拦截（模拟）
const requestInterceptor = (config: RequestConfig): RequestConfig => {
  // 可以在这里统一添加 token
  const token = uni.getStorageSync("token");
  if (token) {
    config.header = {
      ...config.header,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
};

// 响应拦截（模拟）
const responseInterceptor = {
  success: <T>(response: T): T => {
    // 这里可以统一处理响应数据格式
    return response;
  },
  error: (error: Error) => {
    // 统一错误处理
    let errorMessage = "网络错误";

    if (error.message.includes("HTTP Error")) {
      const statusCode = (error as any).statusCode;
      switch (statusCode) {
        case 401:
          errorMessage = "未授权，请重新登录";
          // 可以跳转到登录页
          // uni.navigateTo({ url: '/pages/login/login' });
          break;
        case 403:
          errorMessage = "拒绝访问";
          break;
        case 404:
          errorMessage = "请求地址不存在";
          break;
        case 500:
          errorMessage = "服务器内部错误";
          break;
        default:
          errorMessage = `请求失败: ${statusCode}`;
      }
    } else if (error.message.includes("Network Error")) {
      errorMessage = "网络连接失败，请检查网络";
    }

    uni.showToast({
      title: errorMessage,
      icon: "none",
      duration: 3000,
    });

    return Promise.reject(error);
  },
};

// 包装的请求方法，包含拦截器
export function apiRequest<T = any>(
  url: string,
  options: Omit<RequestConfig, "url"> = {}
): Promise<T> {
  const config = requestInterceptor({
    url,
    ...options,
  });

  return request<T>(config)
    .then(responseInterceptor.success)
    .catch(responseInterceptor.error);
}

// 语义化方法
export const get = <T = any>(
  url: string,
  data?: any,
  config?: Omit<RequestConfig, "url" | "method" | "data">
) => apiRequest<T>(url, { ...config, method: "GET", data });

export const post = <T = any>(
  url: string,
  data?: any,
  config?: Omit<RequestConfig, "url" | "method" | "data">
) => apiRequest<T>(url, { ...config, method: "POST", data });

export const put = <T = any>(
  url: string,
  data?: any,
  config?: Omit<RequestConfig, "url" | "method" | "data">
) => apiRequest<T>(url, { ...config, method: "PUT", data });

export const del = <T = any>(
  url: string,
  data?: any,
  config?: Omit<RequestConfig, "url" | "method" | "data">
) => apiRequest<T>(url, { ...config, method: "DELETE", data });

// 文件上传
export const upload = <T = any>(
  url: string,
  filePath: string,
  formData: Record<string, any> = {},
  config?: Omit<RequestConfig, "url" | "method" | "data">
): Promise<T> => {
  return new Promise((resolve, reject) => {
    const fullUrl = url.startsWith("http") ? url : `${baseURL}${url}`;

    uni.uploadFile({
      url: fullUrl,
      filePath,
      name: "file",
      formData,
      header: config?.header,
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const data = JSON.parse(res.data);
            resolve(data);
          } catch (e) {
            resolve(res.data as any);
          }
        } else {
          reject(new Error(`Upload failed: ${res.statusCode}`));
        }
      },
      fail: (err) => {
        reject(new Error(err.errMsg));
      },
    });
  });
};

// 默认导出
export default apiRequest;
