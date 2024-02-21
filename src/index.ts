export const loadJS = (url: string) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
    //其他浏览器
    script.onload = () => resolve('');
    script.onerror = () => reject('加载错误');
  });
};

export const sleep = (timeout = 0) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const getBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

// 手机号脱敏
export const mobileDesensitize = (mobile) => {
  const reg = /(\d{3})\d*(\d{4})/;
  return mobile.replace(reg, `$1****$2`);
};

// 判断文字中是否含有中文字符
export const hasChinese = (str: string) => {
  const reg = /[\u4e00-\u9fa5]/gi;
  return str.match(reg);
};

export function loadImgs(
  urls: Array<string> = [],
  crossOrigin?: string
): Promise<Array<HTMLImageElement | null>> {
  const loadImg = (url: string): Promise<HTMLImageElement | null> => {
    return new Promise((resolve) => {
      if (!url) resolve(null);
      const image = new Image();
      image.src = url;
      image.setAttribute('crossOrigin', crossOrigin || 'anonymous');
      image.onload = () => {
        resolve(image);
      };
      image.onerror = () => {
        resolve(null);
      };
    });
  };
  const promises = urls.map((url: string): Promise<HTMLImageElement | null> => loadImg(url));
  return Promise.all(promises);
}
