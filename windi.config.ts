import { defineConfig } from 'vite-plugin-windicss';
import { primaryColor } from './build/config/themeConfig';

export default defineConfig({
  darkMode: 'class',
  theme: {
    textColor: {
      primary: primaryColor,
    },
  },
  extract: {
    include: ['src/**/*.{vue,html,jsx,tsx}'],
    exclude: ['node_modules', '.git'],
  },
  important: true,
});
