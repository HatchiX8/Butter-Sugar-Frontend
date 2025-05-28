import {
  defineConfig,
  presetMini,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';
import { themeColors } from './src/utils/index';

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
  theme: themeColors,
});
