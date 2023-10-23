import { message } from 'ant-design-vue';
import { SaveDataParams } from '@/api/others/model/commonModel';
import { MenuItemModel } from '@/api/account/model/menuModel';

// import { IMG_DOMAIN } from '@/enums/cacheEnum';
import { ImgDomainEnum } from '@/enums/httpEnum';
import _ from 'lodash-es';

/**
 * @description: 表单保存函数封装
 * @param {*}
 *  loading: Ref, //loading
 *  params: any, //入参
 *  editFunc: Function, //编辑下发接口
 *  addFunc: Function, //添加下发接口
 *  editMsg: string, //编辑成功信息
 *  addMsg: string, //添加成功信息
 *  emitEvents: Function, //emit函数-关闭弹窗，查询表格
 *  addAndEditDeal?: Function, //验证通过后-编辑和新增 参数处理
 *  addDeal?: Function, //验证通过后-新增 参数处理
 *  editDeal?: Function, //验证通过后-编辑 参数处理
 *  clear?: Function //关闭前的清理函数
 * @return {*}
 */
export const saveData = async (_: SaveDataParams) => {
  _.loading.value = true;
  try {
    let msg = '';
    _.addAndEditDeal && _.addAndEditDeal(_.params);
    //唯一值，大部分为code，少部分为id
    if (_.params.code || _.params.id) {
      //编辑
      _.editDeal && _.editDeal(_.params);
      await _.editFunc(_.params);
      msg = _.editMsg;
    } else {
      //新增
      _.addDeal && _.addDeal(_.params);
      await _.addFunc(_.params);
      msg = _.addMsg;
    }
    message.success(msg);
    _.clear && _.clear();
    _.emitEvents('update:modelValue', false);
    _.emitEvents('query');
  } finally {
    _.loading.value = false;
  }
};
/**
 * @description: 表格字典值转换
 * @param {string} dataIndex
 * @param {string} record
 * @return {*}
 */
export const formatTable = (dataIndex: string, text: string | number | string[]) => {
  let result: any = '';
  switch (dataIndex) {
    case 'level': //<————————举个栗子，具体项目可删除该项参数，有在多个页面使用放这
      result = text === 9 ? '主账号' : '子账号';
      break;
    default:
      result = text;
  }
  return result;
};

/**
 * @description: 给路由权限用会去掉is_hidden和btn的按钮
 * @param {any} data
 * @param {string} pidName
 * @param {number} rootPid
 * @return {*}
 */
export function formatTree(data: any[], pidName: string, rootPid: number) {
  if (data) {
    const root: Array<MenuItemModel> = [];
    const idMapping: { [key: string]: number } = data.reduce((acc, el, i) => {
      acc[el.id] = i;
      return acc;
    }, {});
    data.forEach((el) => {
      // 判断根节点
      if (el[pidName] === rootPid) {
        root.push(el);
        return;
      }
      // 用映射表找到父元素
      const parentEl = data[idMapping[el[pidName]]];
      if (parentEl && el.is_hidden == -1 && el.type == 2) {
        parentEl.children = [...(parentEl.children || []), el];
      }
    });
    return root;
  } else {
    return [];
  }
}
//菜单管理页面数据处理
export function formatTree_v2(data: any[], pidName: string, rootPid: number) {
  if (data) {
    const root: Array<any> = [];
    const idMapping: { [key: string]: number } = data.reduce((acc, el, i) => {
      acc[el.id] = i;
      return acc;
    }, {});
    data.forEach((el) => {
      // 判断根节点
      if (el[pidName] === rootPid) {
        root.push(el);
        return;
      }
      // 用映射表找到父元素
      const parentEl = data[idMapping[el[pidName]]];
      if (parentEl) {
        parentEl.children = [...(parentEl.children || []), el];
      }
    });
    return root;
  } else {
    return [];
  }
}

//递归处理排序
export function loopDealSort(arr) {
  arr.sort((a, b) => {
    return a.sort - b.sort;
  });
  arr.forEach((v) => {
    if (v.children) {
      loopDealSort(v.children);
    }
  });
}

/**
 * @description: 获取图片完整地址
 * @param {any} url 图片地址
 * @param {any} size 图片大小
 * @return {*}
 */
export function getImgFullUrl(url: any, size?: any, isNew?: boolean) {
  const uploadFiles = (window as any).DDuploadFiles;
  //console.log('url', url);
  if (!url) {
    return undefined;
  }
  // let imgDomain = localStorage.getItem(IMG_DOMAIN) as any;
  if (url?.includes('base64')) {
    return url;
  }
  if (url && url?.includes('http')) {
    return url;
  }
  const oldVersion = url?.includes('preview');
  if (isNew || !oldVersion) {
    const result = uploadFiles.getFullPathWithSize(url, size);
    return result;
  } else {
    let imgDomain = ImgDomainEnum[(window as any).DDenv.MODE] as any;
    if (url?.startsWith('http') || url?.startsWith('https')) {
      imgDomain = '';
    }
    if (url?.includes('?style=')) {
      return `${imgDomain}${url}`;
    }
    return size ? `${imgDomain}${url}?style=s${size}` : `${imgDomain}${url}`;
  }
  // if (url?.includes('?style=')) {
  //   return `${imgDomain}${url}`;
  // }
}

// 过滤空值
export const filterEmptyParams = (params) => {
  for (const i in params) {
    if (
      params[i] === '' ||
      params[i] === null ||
      params[i] === undefined ||
      (params[i] instanceof Array && params[i]?.length === 0) ||
      (params[i] instanceof Object && Object.keys(params[i]).length === 0)
    ) {
      delete params[i];
    }
  }
};

// 路由跳转
export const link = (pathData, isNew = false) => {
  const router = (window as any).DDrouter;
  if (isNew) {
    const r = router.resolve(pathData);
    window.open(r.href, '_blank');
  } else {
    router.push(pathData);
  }
};
export const linkToReplace = (path) => {
  const router = (window as any).DDrouter;
  return router.replace(path);
};

// 手机号脱敏
export const mobileDesensitize = (mobile) => {
  const reg = /(\d{3})\d*(\d{4})/;
  return mobile.replace(reg, `$1****$2`);
};

export const downloadImg = (urlInfo: { url: string; name?: string }) => {
  fetch(urlInfo.url).then((res) =>
    res.blob().then((blob) => {
      const a = document.createElement('a'), // 动态创建a标签，防止下载大文件时，用户没看到下载提示连续点击
        url = window.URL.createObjectURL(blob),
        filename = urlInfo.name;
      a.href = url;
      if (filename) a.download = filename;
      a.click();
      window.URL.revokeObjectURL(urlInfo.url);
    })
  );
};
export const downloadImgs = (urls: Array<{ url: string; name: string }>) => {
  urls?.forEach((url) => downloadImg(url));
};

// 临时使用
export const downloadFile = (url, name?: string) => {
  const a = document.createElement('a');
  a.style.display = 'none';
  a.setAttribute('target', '_blank');
  name && a.setAttribute('download', name);
  a.href = url;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

// 金额向上取整
export function moneyPrecision(data, precision = 2) {
  const d1 = _.ceil(Number(data), precision).toFixed(precision);
  return d1;
}
export const sleep = (timeout = 0) => new Promise((resolve) => setTimeout(resolve, timeout));
