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
                rippleColor: '#DCDCDC40',
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
                // Disabled Primary
                colorDisabledPrimary: '#B0A7A7',
                textColorDisabledPrimary: '#FFFDFA',
                borderDisabledPrimary: '1px solid #B0A7A7',
                // 其他樣式
                borderRadiusMedium: '2px',
                paddingMedium: '.75rem 1.5rem',
                fontSizeMedium: '1rem',
                heightMedium: '',
              },
              Select: {
                peers: {
                  InternalSelection: {
                    heightSmall: '24px',
                    fontSizeSmall: '14px',
                    paddingSingle: '0 8px',
                    borderRadius: '4px',
                    textColor: '#FFFDFD',
                    fontWeight: '400',
                    // fontFamily: 'Noto Serif TC',
                    color: '#000000', // 無背景色或透明
                    boxShadowFocus: '0 0 0 2px rgba(255, 255, 255, 0.2)',
                    border: '1px solid #FFFDFD',
                    // iconColor: '#FFFDFD',
                    // gap: '4px',
                    // transition: 'none',
                  },
                  InternalSelectMenu: {
                    color: '#3e382e', // 下拉選單背景色
                    optionColorActive: '#6e6961', // 被選取的選項底色
                    optionColorPending: '#6e6961', // hover/focus 底色
                    // optionColor: '#3e382e', // 一般選項底色
                    optionTextColor: '#FFFDFD', // 一般選項文字色
                    optionTextColorActive: '#FFFDFD', // 被選取的選項文字色
                    // optionTextColorPending: '#FFFDFD', // hover/focus 文字色
                    // boxShadow:
                    //   '0 3px 6px -4px rgba(0, 0, 0, .12), 0 6px 16px 0 rgba(0, 0, 0, .08), 0 9px 28px 8px rgba(0, 0, 0, .05)',

                    borderRadius: '4px',
                    optionFontSizeSmall: '14px',
                    optionHeightSmall: '24px',
                    // optionFontWeightActive: '400',
                    // optionFontWeight: '400',
                    // optionFontFamily: 'Noto Serif TC',
                    optionPaddingSmall: '0 8px',
                  },
                },
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
