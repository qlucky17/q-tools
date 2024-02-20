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

export const sleep = (timeout = 0) => new Promise((resolve) => setTimeout(resolve, timeout));

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
