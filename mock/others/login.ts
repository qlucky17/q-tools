import { success } from '../_util';
import { MockMethod } from 'vite-plugin-mock';

const loginUser = {
  avatar: '',
  code: 21120675045,
  email: '',
  is_private: 1,
  is_verification: -1,
  keep_alive: 2,
  level: 9,
  mobile: '15959110377',
  realname: 'yyyyzwy',
  status: 1,
  token: 'eyJpc1N1cGV',
  username: 'yyyyzwy',
  verify_type: 0,
};
const permissionsList = [
  {
    id: 271,
    title: '系统设置yy',
    pid: 0,
    sort: 5,
    type: 2,
    is_hidden: -1,
    is_blank: -1,
    component: '',
    permission: '',
    path: 'sysSet',
    is_path: 1,
    tip: '',
    icon: '',
  },
  {
    id: 272,
    title: '系统管理yy',
    pid: 271,
    sort: 1,
    type: 2,
    is_hidden: -1,
    is_blank: -1,
    component: '',
    permission: '',
    path: 'sysSet/sys',
    is_path: 1,
    tip: '',
    icon: '',
  },
  {
    id: 273,
    title: '账号管理yy',
    pid: 271,
    sort: 1,
    type: 2,
    is_hidden: -1,
    is_blank: -1,
    component: '',
    permission: '',
    path: 'sys/account',
    is_path: 1,
    tip: '',
    icon: '',
  },
  {
    id: 274,
    title: '权限管理yy',
    pid: 271,
    sort: 2,
    type: 2,
    is_hidden: -1,
    is_blank: -1,
    component: '',
    permission: '',
    path: 'sysSet/auth',
    is_path: 1,
    tip: '',
    icon: '',
  },
  {
    id: 275,
    title: '菜单管理yy',
    pid: 272,
    sort: 1,
    type: 2,
    is_hidden: -1,
    is_blank: -1,
    component: '/systemSetting/systemManage/menuManage/index.vue',
    permission: '',
    path: 'sysSet/sys/menuManage',
    is_path: 1,
    tip: '',
    icon: '',
  },
  {
    id: 277,
    title: '用户列表yy',
    pid: 272,
    sort: 1,
    type: 2,
    is_hidden: -1,
    is_blank: -1,
    component: '/systemSetting/systemManage/userList/index.vue',
    permission: '',
    path: 'sysSet/sys/userList',
    is_path: 1,
    tip: '',
    icon: '',
  },
  {
    id: 278,
    title: '新建菜单',
    pid: 275,
    sort: 1,
    type: 1,
    is_hidden: -1,
    is_blank: -1,
    component: '',
    permission: 'add',
    path: '',
    is_path: -1,
    tip: '',
    icon: '',
  },
  {
    id: 279,
    title: '编辑菜单',
    pid: 275,
    sort: 1,
    type: 1,
    is_hidden: -1,
    is_blank: -1,
    component: '',
    permission: 'edit',
    path: '',
    is_path: -1,
    tip: '',
    icon: '',
  },
  {
    id: 280,
    title: '删除菜单',
    pid: 275,
    sort: 1,
    type: 1,
    is_hidden: -1,
    is_blank: -1,
    component: '',
    permission: 'delete',
    path: '',
    is_path: -1,
    tip: '',
    icon: '',
  },
  {
    id: 281,
    title: '查看菜单',
    pid: 275,
    sort: 1,
    type: 1,
    is_hidden: -1,
    is_blank: -1,
    component: '',
    permission: '',
    path: '',
    is_path: -1,
    tip: '',
    icon: '',
  },
  {
    id: 282,
    title: '编辑',
    pid: 277,
    sort: 1,
    type: 1,
    is_hidden: -1,
    is_blank: -1,
    component: '',
    permission: 'edit',
    path: '',
    is_path: -1,
    tip: '',
    icon: '',
  },
  {
    id: 283,
    title: '登录日志',
    pid: 277,
    sort: 1,
    type: 1,
    is_hidden: -1,
    is_blank: -1,
    component: '',
    permission: 'logger',
    path: '',
    is_path: -1,
    tip: '',
    icon: '',
  },
  {
    id: 284,
    title: '删除',
    pid: 277,
    sort: 1,
    type: 1,
    is_hidden: -1,
    is_blank: -1,
    component: '',
    permission: 'delete',
    path: '',
    is_path: -1,
    tip: '',
    icon: '',
  },
  {
    id: 285,
    title: '我的账号yy',
    pid: 273,
    sort: 1,
    type: 2,
    is_hidden: -1,
    is_blank: -1,
    component: '/systemSetting/accountManage/myAccount/index.vue',
    permission: '',
    path: 'sysSet/account/myAccount',
    is_path: 1,
    tip: '',
    icon: '',
  },
  {
    id: 286,
    title: '账号安全设置yy',
    pid: 273,
    sort: 1,
    type: 2,
    is_hidden: -1,
    is_blank: -1,
    component: '/systemSetting/accountManage/accountSet/index.vue',
    permission: '',
    path: 'sysSet/account/accountSet',
    is_path: 1,
    tip: '',
    icon: '',
  },
  {
    id: 287,
    title: '角色权限yy',
    pid: 274,
    sort: 1,
    type: 2,
    is_hidden: -1,
    is_blank: -1,
    component: '/systemSetting/authManage/roleList/index.vue',
    permission: '',
    path: 'sysSet/auth/roleList',
    is_path: 1,
    tip: '',
    icon: '',
  },
  {
    id: 288,
    title: '子账号列表yy',
    pid: 274,
    sort: 1,
    type: 2,
    is_hidden: -1,
    is_blank: -1,
    component: '/systemSetting/authManage/subAccount/index.vue',
    permission: '',
    path: 'sysSet/auth/subAccount',
    is_path: 1,
    tip: '',
    icon: '',
  },
  {
    id: 289,
    title: '账号安全规则yy',
    pid: 274,
    sort: 1,
    type: 2,
    is_hidden: -1,
    is_blank: -1,
    component: '/systemSetting/authManage/safetyRule/index.vue',
    permission: '',
    path: 'sysSet/auth/safetyRule',
    is_path: 1,
    tip: '',
    icon: '',
  },
  {
    id: 290,
    title: '新增角色',
    pid: 287,
    sort: 1,
    type: 1,
    is_hidden: -1,
    is_blank: -1,
    component: '',
    permission: 'add',
    path: '',
    is_path: -1,
    tip: '',
    icon: '',
  },
  {
    id: 291,
    title: '编辑角色',
    pid: 287,
    sort: 1,
    type: 1,
    is_hidden: -1,
    is_blank: -1,
    component: '',
    permission: 'edit',
    path: '',
    is_path: -1,
    tip: '',
    icon: '',
  },
  {
    id: 292,
    title: '删除',
    pid: 287,
    sort: 1,
    type: 1,
    is_hidden: -1,
    is_blank: -1,
    component: '',
    permission: 'delete',
    path: '',
    is_path: -1,
    tip: '',
    icon: '',
  },
  {
    id: 293,
    title: '批量修改角色',
    pid: 288,
    sort: 1,
    type: 1,
    is_hidden: -1,
    is_blank: -1,
    component: '',
    permission: 'batch_edit_role',
    path: '',
    is_path: -1,
    tip: '',
    icon: '',
  },
  {
    id: 294,
    title: '批量修改安全规则',
    pid: 288,
    sort: 1,
    type: 1,
    is_hidden: -1,
    is_blank: -1,
    component: '',
    permission: 'batch_edit_rule',
    path: '',
    is_path: -1,
    tip: '',
    icon: '',
  },
  {
    id: 295,
    title: '新增子账户',
    pid: 288,
    sort: 1,
    type: 1,
    is_hidden: -1,
    is_blank: -1,
    component: '',
    permission: 'add_sub_account',
    path: '',
    is_path: -1,
    tip: '',
    icon: '',
  },
  {
    id: 296,
    title: '修改密码',
    pid: 288,
    sort: 1,
    type: 1,
    is_hidden: -1,
    is_blank: -1,
    component: '',
    permission: 'update_password',
    path: '',
    is_path: -1,
    tip: '',
    icon: '',
  },
  {
    id: 297,
    title: '编辑',
    pid: 288,
    sort: 1,
    type: 1,
    is_hidden: -1,
    is_blank: -1,
    component: '',
    permission: 'edit',
    path: '',
    is_path: -1,
    tip: '',
    icon: '',
  },
  {
    id: 298,
    title: '解锁',
    pid: 288,
    sort: 1,
    type: 1,
    is_hidden: -1,
    is_blank: -1,
    component: '',
    permission: 'unlock',
    path: '',
    is_path: -1,
    tip: '',
    icon: '',
  },
  {
    id: 299,
    title: '批量启用',
    pid: 288,
    sort: 1,
    type: 1,
    is_hidden: -1,
    is_blank: -1,
    component: '',
    permission: 'sub_batch_open',
    path: '',
    is_path: -1,
    tip: '',
    icon: '',
  },
  {
    id: 300,
    title: '启用/禁用',
    pid: 288,
    sort: 1,
    type: 1,
    is_hidden: -1,
    is_blank: -1,
    component: '',
    permission: 'sub_status',
    path: '',
    is_path: -1,
    tip: '',
    icon: '',
  },
  {
    id: 301,
    title: '新增规则',
    pid: 289,
    sort: 1,
    type: 1,
    is_hidden: -1,
    is_blank: -1,
    component: '',
    permission: 'add',
    path: '',
    is_path: -1,
    tip: '',
    icon: '',
  },
  {
    id: 302,
    title: '编辑',
    pid: 289,
    sort: 1,
    type: 1,
    is_hidden: -1,
    is_blank: -1,
    component: '',
    permission: 'edit',
    path: '',
    is_path: -1,
    tip: '',
    icon: '',
  },
  {
    id: 303,
    title: '删除',
    pid: 289,
    sort: 1,
    type: 1,
    is_hidden: -1,
    is_blank: -1,
    component: '',
    permission: 'delete',
    path: '',
    is_path: -1,
    tip: '',
    icon: '',
  },
];

const userInfo = {
  avatar: '',
  code: 21120675045,
  created: '2021-12-06 10:21:39',
  email: '945320646@qq.com',
  is_private: 1,
  is_verification: -1,
  last_login_time: '2022-02-18 14:37:56',
  level: 9,
  locations: ['本地局域网'],
  mobile: '15959110377',
  realname: 'yyyyzwy',
  status: 1,
  username: 'yyyyzwy',
  verify_type: 0,
};

export default [
  {
    url: '/zdh-svc/api/member/uct/login',
    method: 'post',
    response: () => {
      return success(loginUser);
    },
  },

  {
    url: '/zdh-svc/api/member/ucp/logout',
    method: 'post',
    response: () => {
      return success();
    },
  },

  {
    url: '/zdh-svc/api/member/ucp/menu/permissions',
    method: 'get',
    response: () => {
      return success(permissionsList);
    },
  },

  {
    url: '/zdh-svc/api/member/management/account_info',
    method: 'get',
    response: () => {
      return success(userInfo);
    },
  },
] as MockMethod[];
