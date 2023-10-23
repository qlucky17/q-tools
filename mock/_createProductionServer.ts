import { MockMethod } from 'vite-plugin-mock';
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';

const modules: Record<string, MockMethod[]> = import.meta.glob('./**/*.ts', {
  import: 'default',
  eager: true,
});

const mockModules: any[] = [];
Object.keys(modules).forEach((key) => {
  if (key.includes('/_')) {
    return;
  }
  mockModules.push(...modules[key]);
});

/**
 * Used in a production environment. Need to manually import all modules
 */
export function setupProdMockServer() {
  createProdMockServer(mockModules);
}
