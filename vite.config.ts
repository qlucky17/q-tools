import { ConfigEnv, defineConfig, loadEnv } from 'vite'; // defineConfig:帮手函数，这样不用 jsdoc 注解也可以获取类型提示
import { resolve } from 'path';
import { wrapperEnv } from './build/utils';
import createVitePlugins from './build/vite/plugin/index';

const pathResolve = (dir: string) => {
  return resolve(process.cwd(), '.', dir);
};

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const { VITE_PORT } = viteEnv;
  const isBuild = command === 'build';

  return {
    plugins: createVitePlugins(isBuild),
    resolve: {
      alias: [
        {
          find: 'vue-i18n',
          replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
        },
        {
          find: '@',
          replacement: pathResolve('src'), // 这里是将src目录配置别名为 @ 方便在项目中导入src目录下的文件
        },
        {
          find: '#',
          replacement: pathResolve('types'),
        },
      ],
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
        scss: {
          additionalData: `
            @import './src/assets/css/common.scss';`,
          charset: false,
        },
      },
    },
    server: {
      host: true, //指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 将监听所有地址，包括局域网和公网地址
      port: VITE_PORT, //启动端口
    },

    build: {
      lib: {
        // Could also be a dictionary or array of multiple entry points
        entry: resolve(__dirname, './src/index.ts'),
        name: 'QTools',
        // the proper extensions will be added
        fileName: (format) => `q-tools.${format}.js`,
      },
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        external: ['vue'],
        output: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            vue: 'Vue',
          },
        },
      },
      chunkSizeWarningLimit: 2000,
    },
  };
});
