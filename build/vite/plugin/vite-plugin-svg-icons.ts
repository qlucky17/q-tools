import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { resolve } from 'path';

const pathResolve = (dir: string) => {
  return resolve(process.cwd(), '.', dir);
};

export default function () {
  return createSvgIconsPlugin({
    iconDirs: [pathResolve('src/assets/image/svgIcons')],
    symbolId: 'svgIcon-[dir]-[name]',
  });
}
