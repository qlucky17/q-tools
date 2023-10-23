/**
 * @description: 登录相关 常量
 */

export enum LoginEnum {
  APPKEY = 'FFFF0N000000000074F9',
  SCENE = 'nc_login',
  PLATFORM = 9, //平台标识，不同平台记得修改
  SALT = '1aDlxSdiuLqnUZe9kA', //密码加密数
}

// 登录平台, AppType
export enum LoginPlatformType {
  BUSINESS_CLIENT = 1,
  FACTORY_CLIENT = 2,
  LOGISTICS_CLIENT = 3,
  AGENT_CLIENT = 5,
  BUSINESS_INVITATION_OPERATION_CLIENT = 6,
  BUSINESS_OPERATION_CLIENT = 7,
  DATABANK_CLIENT = 8,
  ZDH_CLIENT = 9,
  CHAN_POOL = 10,
  GROUP_OTHER = 99,
}

// 手机验证
export enum CellphoneVerifyModule {
  BIND_CELLPHONE = 1,
  FIND_PASSWORD = 2,
  CANCEL_CELLPHONE = 3,
  VERIFY_CELLPHOE = 4,
  CELLPHONE_BIND_EMAIL = 5,
  CELLPHONE_UPDATE_EMAIL = 6,
  SMS_FAST_LOGIN = 7,
  CELLPHONE_REGISTER = 8,
}

// 邮箱验证
export enum EmailVerifyModule {
  BIND_EMAIL = 1,
  EMAIL_UPDATE_CELLPHONE = 2,
  FORGET_PASSWORD = 3,
}
