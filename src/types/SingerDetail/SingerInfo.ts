interface DescInt {
  ti: string,
  txt: string
}

export class InitData {
  id : string = ''
  desc: DescInt = {
    ti: '',
    txt: ''
  }
  descList: DescInt[] = []
}