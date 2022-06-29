export interface audioInt {
  name: string,
  picUrl: string,
  copywriter: string,
  category: string
}

interface recomAudioInt {
  categoryName: string,
  categoryId: number,
  radios: {picUrl: string,name:string,rcmdText:string}[]
}

export class InitData {
  bannerList: {pic: string}[] = []
  bannerHeight: number = 210
  cateList: {pic84x84IdUrl: string, name: string}[] = []
  audioRecommendList: audioInt[] = []
  audioRankList: audioInt[] = []
  audioRecommendCate: recomAudioInt[] = []
}