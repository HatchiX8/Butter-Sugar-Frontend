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
              Button: {
                // Default
                color: '#1D1810',
                colorHover: '#1D1810',
                colorPressed: '#1D1810',
                colorFocus: '#1D1810',
                textColor: '#B0A7A7',
                textColorHover: '#FFFDFA',
                textColorPressed: '#FFFDFA',
                textColorFocus: '#FFFDFA',
                border: '1px solid #DCDCDC40',
                borderHover: '1px solid #DCDCDC40',
                borderPressed: '1px solid #DCDCDC40',
                // Primary
                colorPrimary: '#D68E39',
                colorHoverPrimary: '#E2BD7D',
                colorPressedPrimary: '#FAEAD0',
                colorFocusPrimary: '#D68E39',
                textColorPrimary: '#FFFDFA',
                textColorHoverPrimary: '#FFFDFA',
                textColorPressedPrimary: '#FFFDFA',
                borderPrimary: 'none',
                borderHoverPrimary: '1px solid #E2BD7D',
                borderPressedPrimary: '1px solid #FAEAD0',
                borderFocusPrimary: '1px solid #D68E39',
                // 其他樣式
                borderRadiusMedium: '2px',
                paddingMedium: '.75rem 1.5rem',
                fontSizeMedium: '1rem',
                heightMedium: '',
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
