import viteCompression from 'vite-plugin-compression';

export default function () {
  return viteCompression({ deleteOriginFile: false });
}
