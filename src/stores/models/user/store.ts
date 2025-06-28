import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { parseJwt } from '@/utils/api/jwt';
import type { JwtPayload } from '@/utils/api/jwt';
import { getUser } from '@/api/user/user';
import type { ApiResponse, User } from '@/api/user/types';
import { apiErrorMessage } from '@/utils/api/apiErrorMsg';

export type UserRole = 'student' | 'teacher' | null;

export const useUserStore = defineStore('userStore', () => {
  const userToken = ref<string | null>(localStorage.getItem('access_token'));
  const isLoggedIn = computed(() => !!userToken.value);
  const error = ref<string | null>(null);
  const id = ref<string>();
  const email = ref<string>();
  const profileImageUrl = ref<string>();

  // 用解析函式把 JWT 解析成物件
  const payload = computed<JwtPayload | null>(() =>
    userToken.value ? parseJwt(userToken.value) : null
  )

  // 使用者 id
  id.value = payload.value?.id || '';

  // 更新使用者頭像
  const setProfileImageUrl = async (url: string) => {
    profileImageUrl.value = url;
  };

  // 取得使用者資料
  const fetchUser = async () => {
    error.value = null;
    try {
      const res: ApiResponse<User> = await getUser();
      if (res.data) {
        email.value = res.data.email || '';
        profileImageUrl.value = res.data.avatar || '';
      }
    } catch (err) {
      const message = apiErrorMessage(err);
      error.value = message;
    }
  };

  // 使用者角色（預設 student）
  const role = ref<UserRole>('student');

  /* 使用者顯示名稱（可先給空字串） */
  const name = ref<string>('');

  // ----------寫入token----------
  const setToken = (token: string) => {
    userToken.value = token;
    localStorage.setItem('access_token', token);
  };

  // ----------登出----------
  const logout = () => {
    userToken.value = null;
    localStorage.removeItem('access_token');
  };

  return {
    /** state */
    userToken,
    role,
    name,
    id,
    email,
    profileImageUrl,
    /** getters */
    isLoggedIn,
    /** actions */
    setToken,
    logout,
    fetchUser,
    setProfileImageUrl,
  };
});
