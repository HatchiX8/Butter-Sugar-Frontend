// NaiveUI 全域型別宣告

import type { MessageApi } from 'naive-ui'

declare global {
  interface Window {
    $message?: MessageApi
  }
}
