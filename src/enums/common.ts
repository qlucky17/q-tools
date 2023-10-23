export const PasswordLevelObj: { [key: number]: string } = {
  1: '弱',
  2: '中',
  3: '强',
};
export const PasswordLevel: { [key: number]: PasswordLevelType } = {
  0: 'info',
  1: 'danger',
  2: 'warning',
  3: 'success',
};
export type PasswordLevelType = 'warning' | 'info' | 'danger' | 'success';

export const SafeRuleEquipType: { [key: number]: string } = {
  1: '多设备登录',
  2: '单设备登录',
};
export const SafeRuleIPType: { [key: number]: string } = {
  1: '不限IP',
  2: '仅限IP白名单',
};

// 颜色标记
export const ColorFlagOptions = [
  { id: 0, color: '#FFFFFF', name: '空标记' },
  { id: 1, color: '#FF514D', name: '红色' },
  { id: 2, color: '#FF9E30', name: '橙色' },
  { id: 3, color: '#FFCC2D', name: '黄色' },
  { id: 4, color: '#00D253', name: '绿色' },
  { id: 5, color: '#248EFF', name: '蓝色' },
  { id: 6, color: '#BE6CDA', name: '紫色' },
];
