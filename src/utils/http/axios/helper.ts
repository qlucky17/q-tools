import { ObjectProps } from '#/utils';
import { RequestEnum } from '@/enums/httpEnum';
import { encryptByHmacsha256 } from '@/utils/cipher';
import { isObject, isString } from '@/utils/is';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export function joinTimestamp<T extends boolean>(
  join: boolean,
  restful: T
): T extends true ? string : object;

export function joinTimestamp(join: boolean, restful = false): string | object {
  if (!join) {
    return restful ? '' : {};
  }
  const now = new Date().getTime();
  if (restful) {
    return `?_t=${now}`;
  }
  return { _t: now };
}

/**
 * @description: Format request parameter time
 */
export function formatRequestDate(params: Recordable) {
  if (Object.prototype.toString.call(params) !== '[object Object]') {
    return;
  }

  for (const key in params) {
    const format = params[key]?.format ?? null;
    if (format && typeof format === 'function') {
      params[key] = params[key].format(DATE_TIME_FORMAT);
    }
    if (isString(key)) {
      const value = params[key];
      if (value) {
        try {
          params[key] = isString(value) ? value.trim() : value;
        } catch (error: any) {
          throw new Error(error);
        }
      }
    }
    if (isObject(params[key])) {
      formatRequestDate(params[key]);
    }
  }
}

export function getHeaders(
  paramsSortString: string,
  payloadString: string,
  method: string,
  token = ''
) {
  const stamp = new Date().getTime();
  const nonce = Math.floor(Math.random() * 999999);
  let sercetKey = '';
  if (method.toUpperCase() === RequestEnum.GET) {
    sercetKey = [stamp, nonce, paramsSortString].sort().join('');
  } else {
    sercetKey = [stamp, nonce, paramsSortString, payloadString].sort().join('');
  }
  const sign = encryptByHmacsha256(sercetKey, token);

  return { stamp, nonce, sign };
}

export function getUrlParmas(url = '') {
  const obj = {};
  const parmasString = url.split('?')[1];
  if (parmasString) {
    const keyValues = parmasString.split('&');
    for (const keyValue of keyValues) {
      const item = keyValue.split('=');
      const key = item[0];
      const value = item[1] ?? '';
      obj[key] = value;
    }
  }
  return obj;
}

export function objKeySort(arys: ObjectProps) {
  const newkey = Object.keys(arys).sort();
  const newObj = {};
  for (const key of newkey) {
    newObj[key] = arys[key];
  }
  return newObj;
}
