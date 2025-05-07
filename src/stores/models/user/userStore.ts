import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '' as string,
    userId: '' as string,
    avatarUrl: ''
  }),
  actions: {
    setToken(t: string) {
      this.token = t
    },
    setUserId(id: string) {
      this.userId = id
    },
    setAvatar(url: string) {         
      this.avatarUrl = url
    },
    logout() {
      this.token = ''
      this.userId = ''
      this.avatarUrl = ''
      localStorage.clear()
    }
  }
})