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
      cookie: localStorage.getItem('cookie')
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
const cookie = '9d89ce1eae3d3e2b19be57c8952325a0=2c2031bf-1ea9-4e13-95b2-92484a027d34.7Gy7ZchFj-UO2zUyp9t7c02AHJY; order=id%20desc; serverType=nginx; pro_end=-1; ltd_end=-1; memSize=1998; bt_user_info=%7B%22status%22%3Atrue%2C%22msg%22%3A%22%u83B7%u53D6%u6210%u529F%21%22%2C%22data%22%3A%7B%22username%22%3A%22150****2797%22%7D%7D; SetName=; ChangePath=10; sites_path=/www/wwwroot; site_model=php; rank=list; Path=/www/wwwroot; file_recycle_status=true; record_paste_type=1; 2960fc2d6b4dcc284ebdc9f9c7152a8e=fe986542-e123-4711-8f28-b9831ed1368f.m8tBDL5hClgqdn1saSugCHrIR28; request_token=7WZXvunZ1PPL1g32EV0FmSgjvpxwmcm1ILzewTIFJGQN9h0m; backup_path=/www/backup; config-tab=0; network-unitType=KB/s; disk-unitType=KB/s; loginState=false; NMTID=00OSmkDYf3dRDa4iEuilZaxB7ffow0AAAGCixxa6Q'

// 手机号登录
export function loginByPhone(data: {
  phone: string,
  password?: string,
  captcha?: string,
}) {
  return $http({
    url: '/login/cellphone',
    params: {
      ...data,
      cookie
    }
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