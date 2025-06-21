import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export type UserRole = 'student' | 'teacher' | null;

export const useUserStore = defineStore('userStore', () => {
  const userToken = ref<string | null>(localStorage.getItem('access_token'));
  const isLoggedIn = computed(() => !!userToken.value);

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
    /** getters */
    isLoggedIn,
    /** actions */
    setToken,
    logout,
  };
});
