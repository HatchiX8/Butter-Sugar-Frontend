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
      },
    }),
  ],
  transformers: [
    transformerDirectives(), // 支援 @apply
    transformerVariantGroup(), // 支援 hover:(text-white bg-blue-500)
  ],
});
