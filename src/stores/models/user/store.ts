import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { getUser } from '@/api/index';

// export type UserRole = 'student' | 'teacher' | null;

export const useUserStore = defineStore('userStore', () => {
  const userToken = ref<string | null>(localStorage.getItem('access_token'));
  const isLoggedIn = computed(() => !!userToken.value);

  // 使用者角色（預設 student）
  const role = ref<string>('');

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

  // ----------取得身分API----------
  const fetchUser = async () => {
    try {
      const response = await getUser();
      role.value = response.data.role;
      console.log('store權限', response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  // ------------------------------

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
    fetchUser,
  };
});
