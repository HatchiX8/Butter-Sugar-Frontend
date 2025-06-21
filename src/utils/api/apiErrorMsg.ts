import axios from 'axios';

export const apiErrorMessage = (err: unknown): string => {
  if (axios.isAxiosError(err)) {
    const status = err.response?.status;
    const message = err.response?.data?.message;

    if (status === 400) return message || '請求格式錯誤(error 400)';
    if (status === 404) return '找不到資源(error 404)';
    if (status === 500) return '伺服器發生錯誤(error 500)';

    return message || `伺服器錯誤(${status ?? '未知錯誤'})`;
  } else if (err instanceof Error) {
    return err.message;
  } else {
    return '發生未知錯誤';
  }
};
