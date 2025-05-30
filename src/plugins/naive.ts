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
import { hexToRgba, themeColors } from '@/utils';

const colors = themeColors.colors;

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
                color: colors.neutral_600,
                colorHover: colors.neutral_600,
                colorPressed: colors.neutral_600,
                colorFocus: colors.neutral_600,
                textColor: colors.neutral_200,
                textColorHover: colors.white,
                textColorPressed: colors.white,
                textColorFocus: colors.white,
                border: `1px solid ${hexToRgba(colors.neutral_100, 0.25)}`,
                borderHover: `1px solid ${hexToRgba(colors.neutral_100, 0.25)}`,
                borderPressed: `1px solid ${hexToRgba(colors.neutral_100, 0.25)}`,
                borderFocus: `1px solid ${hexToRgba(colors.neutral_100, 0.25)}`,
                rippleColor: hexToRgba(colors.neutral_100, 0.25),
                // Primary
                colorPrimary: colors.primaryDefault,
                colorHoverPrimary: colors.primaryLight,
                colorPressedPrimary: colors.primaryPestel,
                colorFocusPrimary: colors.primaryDefault,
                textColorPrimary: colors.white,
                textColorHoverPrimary: colors.white,
                textColorPressedPrimary: colors.white,
                borderPrimary: 'none',
                borderHoverPrimary: `1px solid ${colors.primaryLight}`,
                borderPressedPrimary: `1px solid ${colors.primaryPestel}`,
                borderFocusPrimary: `1px solid ${colors.primaryDefault}`,
                // Disabled Primary
                colorDisabledPrimary: colors.neutral_200,
                textColorDisabledPrimary: colors.white,
                borderDisabledPrimary: `1px solid ${colors.neutral_200}`,
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
                    textColor: '#FFFDFA',
                    fontWeight: '400',
                    color: '#0D0B07', // 預設黑背景色
                    boxShadowFocus: '0 0 0 2px rgba(255, 255, 255, 0.2)',
                    border: '1px solid #FFFDFA',
                    colorActive: '#1D1810'
                  },
                  InternalSelectMenu: {
                    color: '#3e382e', // 下拉選單背景色
                    optionColorActive: '#6e6961', // 被選取的選項底色
                    optionColorPending: '#6e6961', // hover/focus 底色
                    optionColorActivePending: '#6e6961', // 預設選項 hover/focus 底色
                    optionTextColor: '#FFFDFA', // 一般選項文字色
                    optionTextColorActive: '#FFFDFA', // 被選取的選項文字色
                    borderRadius: '4px',
                    optionFontSizeSmall: '14px',
                    optionHeightSmall: '24px',
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
