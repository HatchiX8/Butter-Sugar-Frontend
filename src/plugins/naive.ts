import naive from 'naive-ui'; // ✅ 引入整包 Naive UI

// ✅ 這些 Provider 是用來支援 useMessage / useDialog 等全域功能
import {
  NConfigProvider,
  NMessageProvider,
  NDialogProvider,
  NNotificationProvider,
  NLoadingBarProvider,
} from 'naive-ui';
import { h } from 'vue';
import type { Component } from 'vue'; // Component 是 Vue 提供的通用型別，代表傳入的是一個 Vue 元件。

export { naive };
export function withNaiveProviders(App: Component) {
  return {
    setup() {
      return () =>
        h(
          NConfigProvider,
          {
            themeOverrides: {
              Input: {
                border: '1px solid #0D0B07',
                borderHover: '1px solid #0D0B07',
                borderFocus: '1px solid #0D0B07',
                borderRadius: '4px',
                placeholderColor: '#9e9e9e',
                color: '#9e9e9e',
              },
            },
          },
          {
            default: () =>
              h(
                NLoadingBarProvider,
                {},
                {
                  default: () =>
                    h(
                      NMessageProvider,
                      {},
                      {
                        default: () =>
                          h(
                            NDialogProvider,
                            {},
                            {
                              default: () =>
                                h(
                                  NNotificationProvider,
                                  {},
                                  {
                                    default: () => h(App),
                                  }
                                ),
                            }
                          ),
                      }
                    ),
                }
              ),
          }
        );
    },
  };
}
