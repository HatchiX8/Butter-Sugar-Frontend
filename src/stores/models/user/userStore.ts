import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '' as string,
    userId: '' as string,
  }),
  actions: {
    setToken(t: string) {
      this.token = t
    },
    setUserId(id: string) {
      this.userId = id
    },
    logout() {
      this.token = ''
      // this.avatarUrl = ''
    }
  }
})