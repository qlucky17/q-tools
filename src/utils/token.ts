import { EXPIRES_TIME, LAST_OPERATE_TIME, ONLINE_HOUR, TOKEN_KEY } from '@/enums/cacheEnum';

export function setToken(token: string, expires_in: number) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(ONLINE_HOUR, expires_in + '');
  // setCookie(UCSDK_ONLINE_HOUR, expires_in + '', 365);
  let time = new Date().getTime();
  time += expires_in * 60 * 60 * 1000;
  localStorage.setItem(EXPIRES_TIME, time + '');
}
export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EXPIRES_TIME);
  localStorage.removeItem(ONLINE_HOUR);
  localStorage.removeItem(LAST_OPERATE_TIME);
}

export function refreshTokenInfo() {
  const expires_in = localStorage.getItem(ONLINE_HOUR);

  let timeExpires = 0;
  if (expires_in) {
    timeExpires = Number(expires_in);
  }
  let time = new Date().getTime();
  time += timeExpires * 60 * 60 * 1000;
  localStorage.setItem(EXPIRES_TIME, time + '');
}
export function isRefreshToken() {
  const refreshTimeStr = localStorage.getItem(EXPIRES_TIME);
  const lastOpeateTimeStr = localStorage.getItem(LAST_OPERATE_TIME);
  const onLineHourtimeStr = localStorage.getItem(ONLINE_HOUR);
  if (refreshTimeStr && lastOpeateTimeStr && onLineHourtimeStr) {
    const nowTime = new Date().getTime();
    const refreshTime = Number(refreshTimeStr);
    const lastOpeateTime = Number(lastOpeateTimeStr);
    const onLineHour = Number(onLineHourtimeStr);
    // console.debug(
    //   'lastOpeateTime + onLineHour * 60 * 60 * 1000',
    //   lastOpeateTime,
    //   onLineHour,
    //   lastOpeateTime + onLineHour * 60 * 60 * 1000,
    //   refreshTime,
    //   lastOpeateTime + onLineHour * 60 * 60 * 1000 >= refreshTime
    // );
    if (
      nowTime < refreshTime &&
      refreshTime - nowTime <= 60 * 1000 * 10 &&
      lastOpeateTime + onLineHour * 60 * 60 * 1000 >= refreshTime
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
