import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useUserStore = defineStore('userStore', () => {
  const userToken = ref<string | null>(localStorage.getItem('access_token'));
  const isLoggedIn = computed(() => !!userToken.value);

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
    userToken,
    isLoggedIn,
    setToken,
    logout,
  };
});
