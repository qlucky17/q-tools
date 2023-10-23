import { success } from '../_util';
import { MockMethod } from 'vite-plugin-mock';

const history = (() => {
  const list: unknown[] = [];
  const total = 5;
  for (let index = 0; index < total; index++) {
    list.push({
      id: `${index}`,
      ip: '@ip',
      browser: 'Chrome 9',
      created: '@datetime',
      location: '@city(true)',
      module: 9,
      os: 'Mac OS X',
      response_data: '登录成功',
      status: 1,
    });
  }
  return { list, total };
})();

export default [
  {
    url: '/zdh-svc/api/member/ucp/login/history',
    method: 'get',
    response: () => {
      return success(history);
    },
  },
] as MockMethod[];
