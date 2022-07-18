interface CateInt {
  name: string,
  category: number 
  children: {
    name: string,
    category: number 
  }[]
}

export class InitData {
  cateList: CateInt[] = []
  activeTarArr: string[] = []
  tempTarArr: {i: number, j: number}[] = [
  ]
  file: any = null
  imageWidth: number = 0

  name: string = ''
  desc: string = ''
  img: string = ''
}

