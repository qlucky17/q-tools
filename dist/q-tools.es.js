const loadJS = (url) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
    script.onload = () => resolve("");
    script.onerror = () => reject("\u52A0\u8F7D\u9519\u8BEF");
  });
};
const sleep = (timeout = 0) => new Promise((resolve) => setTimeout(resolve, timeout));
const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
const mobileDesensitize = (mobile) => {
  const reg = /(\d{3})\d*(\d{4})/;
  return mobile.replace(reg, `$1****$2`);
};
const hasChinese = (str) => {
  const reg = /[\u4e00-\u9fa5]/gi;
  return str.match(reg);
};
function loadImgs(urls = [], crossOrigin) {
  const loadImg = (url) => {
    return new Promise((resolve) => {
      if (!url)
        resolve(null);
      const image = new Image();
      image.src = url;
      image.setAttribute("crossOrigin", crossOrigin || "anonymous");
      image.onload = () => {
        resolve(image);
      };
      image.onerror = () => {
        resolve(null);
      };
    });
  };
  const promises = urls.map((url) => loadImg(url));
  return Promise.all(promises);
}
export {
  getBase64,
  hasChinese,
  loadImgs,
  loadJS,
  mobileDesensitize,
  sleep
};
