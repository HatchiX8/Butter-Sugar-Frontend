import {
  defineConfig,
  presetMini,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

export default defineConfig({
  presets: [
    presetMini(),
    presetIcons({
      collections: {
        clarity: () => import('@iconify-json/clarity/icons.json'),
        ion: () => import('@iconify-json/ion/icons.json'),
      },
    }),
  ],
  transformers: [
    transformerDirectives(), // 支援 @apply
    transformerVariantGroup(), // 支援 hover:(text-white bg-blue-500)
  ],
  // safelist, // 後續會寫成一支TS把要預載css寫進去 (動態class不會被UnoCss掃描到)
  theme: {
    colors: {
      primaryDefault: '#D68E39',
      primaryLight: '#E2BD7D',
      primaryPestel: '#FAEAD0',
      secondaryDefault: '#871D03',
      secondaryLight: '#CE6F45',
      white: '#FFFDFA',
      neutral_100: '#DCDCDC',
      neutral_200: '#B0A7A7',
      neutral_300: '#575656',
      neutral_400: '#3E382E',
      neutral_500: '#27231B',
      neutral_600: '#1D1810',
      black: '#0D0B07',
    },
  },
});
