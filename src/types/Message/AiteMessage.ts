import { eventInt } from "../UserInfo/UserEvents";
interface FollowInt {
  userId: number
  id: number
  json: eventInt
}
export class InitData {
  offset: number = 0
  disableScroll: boolean = false
  more: boolean | null = null
  dataList: FollowInt[] = []
}