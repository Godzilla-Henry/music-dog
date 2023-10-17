import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosRequestHeaders,
  InternalAxiosRequestConfig,
} from "axios";

export const service = axios.create({
  baseURL: "/api",
  timeout: 1000,
});

// HTTP request 攔截器
service.interceptors.request.use(
  (config) => {
    // 在這裡加入您的邏輯
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// http Response 攔截器
service.interceptors.response.use(
  (response: any) => {
    const data = response.data;
    return data;
  },
  (error) => {
    const { response, config } = error;
    let message = "";
    if (response) {
      switch (response.status) {
        case 302:
          message = "Api重新定向";
          break;
        case 400:
          message = "Request Body格式錯誤";
          break;
        case 401:
          message = "未授權";
          break;
        case 403:
          message = "禁止！無權限";
          break;
        case 404:
          message = `查無資料`;
          break;
        case 408:
          message = "請求超時";
          break;
        case 500:
          message = "伺服器問題";
          break;
        case 501:
          message = "服務未啟用";
          break;
        case 503:
          message = "服務不可使用";
          break;
        case 504:
          message = "服務暫時無法使用，請稍候再試";
          break;
        case 505:
          message = "Http版本已不支持";
          break;
        default:
          message = "異常";
          break;
      }
    } else if (!window.navigator.onLine) {
      return Promise.reject(new Error("請檢查網路連線"));
    }
    return Promise.reject(message);
  }
);

export default service;
