import {
  getCustomProductDetailApi,
  getProductSpuInfo,
  getBlankProductListEffectImgList,
} from '@/api/customManage/list';
import { reactive, ref } from 'vue';
export default function useEffectImgs() {
  const effectImgVisible = ref(false);
  const effectImgsInfo = reactive<{
    productTitle: string;
    productId: string;
    colors: Array<{ color_id: string | number; color_value?: string; name?: string }>;
    sizes: Array<{ size_id: string | number; name?: string }>;
    colorName: string;
    sizeName: string;
    defaultImgs?: Array<{
      color_id: string | number;
      design_area_id: string | number;
      size_id: string | number;
      file_path: string;
      rel_id: string | number;
    }>;
    blankProductSkuImgs?: Array<{
      id: number;
      images: Array<{
        effect_image_id: number;
        bottom_image: {
          file_id: string;
          file_path: string;
        };
        texture_image: {
          file_id: string;
          file_path: string;
        };
        reference_image: {
          file_id: string;
          file_path: string;
        };
      }>;
      color_id: number;
      color_name: string;
      color_value: string;
      size_name: string;
      size_id: number;
    }>;
    blankProductType?: number; //建模方式 0-未设置 1-按商品建模 2-按尺码建模
    spuSkus: Array<any>;
  }>({
    productId: '',
    colors: [],
    sizes: [],
    colorName: '',
    sizeName: '',
    productTitle: '',
    blankProductType: 0,
    spuSkus: [],
  });
  const viewEffectImgs = async (product_id: string | number, spuId?: string | number) => {
    try {
      //获取定制商品的详情
      effectImgsInfo.productId = product_id as any;
      const productDetail = await getCustomProductDetailApi(product_id);
      effectImgsInfo.defaultImgs = productDetail.images;
      effectImgsInfo.productTitle = `${productDetail.product_name} 效果图`;
      //获取商品颜色尺码
      const spuInfo = await getProductSpuInfo(spuId ? spuId : productDetail.spu_id, {
        ignore_disable_sku: true,
      });
      effectImgsInfo.spuSkus = spuInfo.skus;
      spuInfo?.attributes?.forEach((attribute) => {
        const type = attribute.type;
        const attributeId = attribute.id;
        const attributeItemArray = spuInfo?.attribute_items?.filter(
          (m) => m.attribute_id == attributeId
        );
        if (type == 1) {
          effectImgsInfo.colorName = attribute.name;
          effectImgsInfo.colors = attributeItemArray?.map((m) => ({
            color_id: m.reference_id,
            color_value: JSON.parse(m.value)?.tone,
            name: m.name,
          }));
        } else {
          effectImgsInfo.sizeName = attribute.name;
          effectImgsInfo.sizes = attributeItemArray?.map((m) => ({
            size_id: m.reference_id,
            name: m.name,
          }));
        }
      });
      // 获取空白商品的详情;
      const blankEffectImgConfig = await getBlankProductListEffectImgList(
        productDetail.blank_product_id
      );
      effectImgsInfo.blankProductSkuImgs = blankEffectImgConfig.sku_list;
      effectImgsInfo.blankProductType = blankEffectImgConfig.type;
      effectImgVisible.value = true;
    } catch (error) {
    } finally {
    }
  };
  const viewSkuEffectImg = async (
    product_id: string | number,
    colorInfo: { color_id: string },
    sizeInfo: { size_id: string | number }
  ) => {
    try {
      //获取定制商品的详情
      const productDetail = await getCustomProductDetailApi(product_id);
      effectImgsInfo.defaultImgs = productDetail.images;
      effectImgsInfo.productTitle = `${productDetail.product_name} 效果图`;
      //获取商品颜色尺码
      effectImgsInfo.colors = [
        {
          color_id: colorInfo.color_id,
        },
      ];
      effectImgsInfo.sizes = [
        {
          size_id: sizeInfo.size_id,
        },
      ];

      // 获取空白商品的详情;
      const blankEffectImgConfig = await getBlankProductListEffectImgList(
        productDetail.blank_product_id
      );
      effectImgsInfo.blankProductSkuImgs = blankEffectImgConfig.sku_list;
    } catch (error) {
    } finally {
    }
  };
  return {
    effectImgsInfo,
    viewEffectImgs,
    viewSkuEffectImg,
    effectImgVisible,
  };
}
