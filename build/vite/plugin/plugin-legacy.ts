import legacy from '@vitejs/plugin-legacy';

export default function () {
  return legacy({
    targets: ['ie >= 11'],
    additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
  });
}
