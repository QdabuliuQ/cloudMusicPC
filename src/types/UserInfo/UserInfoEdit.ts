
export class InitData {
  pIndex: number = -1
  province: string = ''
  city: string = ''
  userInfo: any

  tempInfo: {
    nickname: string,
    signature: string,
    gender: string,
    birthday: number,
    province: string,
    city: string,
    avatarUrl: string,
    pCode: string | number,
    cCode: string | number,
    imgForm: any,
    imageWidth: number
  } = {
    nickname: '',
    signature: '',
    gender: '',
    birthday: 0,
    province: '',
    city: '',
    avatarUrl: '',
    pCode: 0,
    cCode: 0,
    imgForm: null,
    imageWidth: 0
  }
}