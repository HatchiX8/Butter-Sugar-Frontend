import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    // 直接從 localStorage 拿，避免刷新後丟失
    token: localStorage.getItem('access_token') || '',
    userId: localStorage.getItem('userId') || '',
    avatarUrl: localStorage.getItem('avatarUrl') || ''
  }),
  actions: {
    setToken(t: string) {
      this.token = t
      localStorage.setItem('access_token', t)     // 同步更新 localStorage
    },
    setUserId(id: string) {
      this.userId = id
      localStorage.setItem('userId', id)
    },
    setAvatar(url: string) {
      this.avatarUrl = url
      localStorage.setItem('avatarUrl', url)
    },
    logout() {
      this.token = ''
      this.userId = ''
      this.avatarUrl = ''
      localStorage.removeItem('access_token')
      localStorage.removeItem('userId')
      localStorage.removeItem('avatarUrl')
    }
  }
})