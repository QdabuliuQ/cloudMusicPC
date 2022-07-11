interface infoInt {
  coverPCUrl: string,
  participateCount: number,
  title: string,
  text: string[],
  resourceJson: string,
}

export class InitData {
  info: infoInt = {
    coverPCUrl: '',
    participateCount: 0,
    title: '',
    text: [],
    resourceJson: '',
  }

  id: string = ''
}