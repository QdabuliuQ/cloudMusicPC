interface IntSheetCategory {
  cateName: string
  cateType: number
  cateIcon: string
  cateList: IntCateItem[]
}

interface IntCateItem {
  name: string,
  resourceCount: number | string,
  category: number | string
}

interface cateDataInt {
  name: string,
  playCount: number,
  coverImgUrl: string,
  [propName: string]: any
}

export class InitData {
  categoryList: IntSheetCategory[] = []
  i: number = -1
  j: number = -1
  pageIndex: number = 1
  categoryData: cateDataInt[] = []
  total: number = 0
}