import $http from "../http";

// 获取二维码生成key
export function getKey(data: {
  timerstamp: number
}) {
  return $http({
    url: '/login/qr/key',
    params: data
  })
}

// 生成二维码
export function getImage(data: {
  key: string,
  qrimg: boolean,
  timerstamp: number
}) {
  return $http({
    url: '/login/qr/create',
    params: data
  })
}

// 检查二维码是否过期
export function checkImage(data: {
  key: string,
  timerstamp: number
}) {
  return $http({
    url: '/login/qr/check',
    params: data
  })
}

// 获取登录状态
export function getLoginStatus(data: {
  cookie: string
}) {
  return $http({
    url: '/login/status?timerstamp='+Date.now(),
    data
  })
}

// 获取用户信息
export function getAccount(data: {
  token: string
}) {
  return $http({
    url: '/user/account?cookie='+data.token,
    method: 'post',
  })
}

// 获取用户详情 
export function getUserDetail(data: {
  uid: number
}) {
  return $http({
    url: '/user/detail',
    params: {
      ...data,
      timestamp: Date.now(),
    }
  })
}

// 退出登录
export function loginOut(data: {
  cookie: string
}) {
  return $http({
    url: '/logout?timerstamp='+Date.now(),
    method: 'post',
    data
  })
}

// 手机号登录
export function loginByPhone(data: {
  phone: string,
  password?: string,
  captcha?: string,
}) {
  return $http({
    url: '/login/cellphone',
    params: data
  })
}

// 发送验证码
export function sendCode(data: {
  phone: string
}) {
  return $http({
    url: '/captcha/sent',
    params: data
  })
}