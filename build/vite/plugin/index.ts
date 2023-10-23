import type { Plugin, PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import WindiCSS from 'vite-plugin-windicss';
import components from './unplugin-vue-components';
import svgIcons from './vite-plugin-svg-icons';
import compression from './vite-plugin-compression';
import pluginVueJSX from '@vitejs/plugin-vue-jsx';

export default function (isBuild: boolean) {
  const vitePlugins: (Plugin | Plugin[] | PluginOption[])[] = [];
  vitePlugins.push(vue());
  vitePlugins.push(WindiCSS());
  vitePlugins.push(components());
  vitePlugins.push(svgIcons());
  vitePlugins.push(pluginVueJSX());
  if (isBuild) {
    vitePlugins.push(compression());
  }

  return vitePlugins;
}
