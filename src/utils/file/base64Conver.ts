import ImageCompressor from 'js-image-compressor';

/**
 * @description: base64 to blob
 */
export function dataURLtoBlob(base64Buf: string): Blob {
  const arr = base64Buf.split(',');
  const typeItem = arr[0];
  const mime = typeItem.match(/:(.*?);/)![1];
  const bstr = window.atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

/**
 * img url to base64
 * @param url
 */
export function urlToBase64(url: string, mineType?: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let canvas = document.createElement('CANVAS') as Nullable<HTMLCanvasElement>;
    const ctx = canvas!.getContext('2d');

    const img = new Image();
    img.crossOrigin = '';
    img.onload = function () {
      if (!canvas || !ctx) {
        return reject();
      }
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL(mineType || 'image/png');
      canvas = null;
      resolve(dataURL);
    };
    img.src = url;
  });
}

/**
 * @description: url to File
 */
export const urlToFile = async (image: {
  url: string;
  name: string;
  type?: string;
  isBase64?: boolean;
}) => {
  const base64 = image.isBase64 ? image.url : await urlToBase64(image.url, image.type);
  const file = new File([dataURLtoBlob(base64)], image.name, { type: image?.type || 'image/jpeg' });
  return file;
};

export const urlToFiles = (
  images: Array<{ url: string; name: string; type?: string; isBase64?: boolean }>
) => {
  return Promise.all(images.map((image) => urlToFile(image)));
};

/**
 * @description: 图片压缩
 */
export const compressImage = (file, options?) => {
  return new Promise((resolve, reject) => {
    new ImageCompressor({
      file: file,
      quality: options?.quality || 0.6,
      maxWidth: options?.size,
      maxHeight: options?.size,
      convertSize: Infinity,
      loose: true,
      redressOrientation: true,
      // beforeCompress: function (result) {
      //   console.log('压缩之前图片尺寸大小: ', result);
      // },
      success: function (result) {
        // console.log('压缩之后图片尺寸大小: ', result);
        resolve(new File([result], result.name, { type: result.type }));
      },
      error(e) {
        reject(e);
      },
    });
  });
};
