import { jwtDecode } from 'jwt-decode';

// token 資料
export interface JwtPayload {
  id: string
  role: 'student' | 'teacher' | 'admin'
  iat: number
  exp: number
};

// 解析 token
export const parseJwt = (token: string): JwtPayload | null => {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (error) {
    console.warn('JWT 解析失敗:', error);
    return null;
  }
};
