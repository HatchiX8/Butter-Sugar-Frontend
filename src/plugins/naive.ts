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
              Icon: {
                color: colors.primaryDefault
              },
              Input: {
                border: `1px solid ${colors.black}`,
                borderHover: `1px solid ${colors.black}`,
                borderFocus: `1px solid ${colors.white}`,
                borderRadius: '4px',
                boxShadowFocus: colors.white,
                colorFocus: colors.black,
                color: colors.black,
                placeholderColor: colors.neutral_300,
                textColor: colors.white,
                caretColor: colors.white,
                // Disabled
                borderDisabled: `1px solid ${colors.neutral_500}`,
                colorDisabled: colors.neutral_500,
                textColorDisabled: colors.neutral_200,
                // Error
                caretColorError: colors.secondaryDefault,
                colorFocusError: colors.secondaryDefault,
                borderError: colors.secondaryDefault,
                borderHoverError: `1px solid ${colors.secondaryDefault}`,
                borderFocusError: `1px solid ${colors.secondaryDefault}`,
                loadingColorError: colors.secondaryDefault,
              },
              Button: {
                // Default
                color: 'none',
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
                // Disabled Default
                colorDisabled: colors.neutral_200,
                textColorDisabled: colors.white,
                borderDisabled: `1px solid ${colors.neutral_200}`,
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
                rippleColorPrimary: colors.primaryDefault,
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
                    colorDisabled: colors.neutral_500,
                    boxShadowFocus: '0 0 0 2px rgba(255, 255, 255, 0.2)',
                    border: '1px solid #FFFDFA',
                    colorActive: '#1D1810',
                    borderActive: '1px solid #D68E39',
                    borderFocus: '1px solid #D68E39',
                    borderHover: '1px solid #D68E39',
                    caretColor: colors.primaryDefault,
                    loadingColor: colors.primaryDefault,
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
              Menu: {
                /* 一般項目 (item) 旁的箭頭 */
                arrowColor: colors.white,               // 預設，也就是「沒 hover/active 時」
                arrowColorHover: colors.primaryDefault,          // 當滑鼠懸停在有箭頭的項目上
                arrowColorActive: colors.primaryDefault,         // 當該項目被選中 (active) 時
                arrowColorChildActive: colors.primaryDefault,    // 如果是「子層」被選中
                arrowColorChildActiveHover: colors.primaryDefault,// 當滑鼠 hover 在「已被選中子層」情況下
                /* 章節標題 (groupHeader) 旁的箭頭 */
                groupHeaderArrowColor: colors.white,
                groupHeaderArrowColorHover: colors.primaryDefault,
                groupHeaderArrowColorActive: colors.primaryDefault,
                groupHeaderArrowColorChildActive: colors.primaryDefault,
                groupHeaderArrowColorChildActiveHover: colors.primaryDefault,
                //
                itemColorHover: hexToRgba(colors.primaryDefault, 0.3),
                itemColorActive: hexToRgba(colors.primaryDefault, 0.8),
              },
              Divider: {
                color: hexToRgba(colors.primaryDefault, 1),
              },
              Form: {
                labelTextColor: colors.white,
              },
              Upload:{
                itemTextColor: colors.white,
                itemTextColorSuccess: colors.primaryDefault,
              }
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
