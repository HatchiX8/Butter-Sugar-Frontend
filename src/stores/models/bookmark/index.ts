import { defineStore } from 'pinia'

interface BookmarkState {
  bookmarkedCourses: Record<string, boolean>
}

export const useBookmarkStore = defineStore('bookmark', {
  state: (): BookmarkState => ({
    bookmarkedCourses: {}
  }),

  actions: {
    // 初始化從 localStorage 載入收藏狀態
    initializeFromLocalStorage() {
      // 從 localStorage 讀取所有以 bookmark_ 開頭的項目
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.startsWith('bookmark_')) {
          const courseUuid = key.replace('bookmark_', '')
          if (courseUuid) {
            this.bookmarkedCourses[courseUuid] = localStorage.getItem(key) === 'true'
          }
        }
      }
    },

    // 檢查課程是否已收藏
    isBookmarked(courseUuid: string): boolean {
      const result = !!this.bookmarkedCourses[courseUuid]
      return result
    },

    // 切換收藏狀態
    toggleBookmark(courseUuid: string): boolean {
      const currentState = this.isBookmarked(courseUuid)
      const newState = !currentState

      this.bookmarkedCourses[courseUuid] = newState

      // 保存到 localStorage
      localStorage.setItem(`bookmark_${courseUuid}`, newState.toString())

      return newState
    },

    // 設定收藏狀態
    setBookmarkState(courseUuid: string, state: boolean) {
      this.bookmarkedCourses[courseUuid] = state
      localStorage.setItem(`bookmark_${courseUuid}`, state.toString())
    }
  }
})
