import { defineConfig } from 'wxt';
import { resolve } from 'node:path';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/auto-icons','@wxt-dev/module-react'],
  srcDir: 'src',
  autoIcons: {
    baseIconPath: resolve('src', 'assets/icon.svg'),
  },
  manifestVersion: 3,
  manifest:{
    name: "Brevity",
    description: "Speed up your job applications by writing only what you need to.",
    version: "1.0",
    action: {},
  }
});
