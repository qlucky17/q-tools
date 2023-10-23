import { defineStore } from 'pinia';
import { pinia } from '..';

interface SystemInfo {
  isLoading: boolean;
  lang: string;
}
export const systemStore = defineStore('system', {
  state: (): SystemInfo => ({
    isLoading: false,
  }),
  getters: {},
  actions: {
    showLoading() {
      this.isLoading = true;
    },
    hideLoading() {
      this.isLoading = false;
    },
  },
});

export const systemStoreWithOut = () => {
  return systemStore(pinia);
};
