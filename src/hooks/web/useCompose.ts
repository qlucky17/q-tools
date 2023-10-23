// @ts-nocheck
import { FnDesign } from 'zw-3d/lib/zwDesign';

const http = (window as any).DDhttp;

export default function useCompose() {
  const createDesign = (params: { productId: string; skuID; env: any }) => {
    return new Promise((resolve, reject) => {
      const design = new FnDesign({
        defineProductId: params.productId,
        skuID: params.skuID,
        http,
        needUpload: true,
        env: params.env,
        index: 0,
        callBack: () => {
          resolve({ design });
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  };
  return {
    createDesign,
  };
}
