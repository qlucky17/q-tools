/**
 * @description: Request result set
 */
export enum ResultEnum {
  SUCCESS = 200,
  ERROR = 1,
  TIMEOUT = '401',
  FORCED_OFFLINE = 'Q1010', //管理员强制下线
  TYPE = 'success',
}

/**
 * @description: request method
 */
export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

/**
 * @description:  contentType
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}

// 上传内容分发地址
export enum ImgUploadActionEnum {
  development = 'http://content-api.zwdc.com',
  test = 'http://content-api.zwdc.com',
  sandbox = 'https://content-api.zhiwendiy.com',
  production = 'https://content-api.hicustom.com',
}

// 图片域名地址
export enum ImgDomainEnum {
  development = 'http://content.zwdc.com',
  test = 'http://content.zwdc.com',
  sandbox = 'https://content.zhiwendiy.com',
  production = 'https://content.hicustom.com',
}
