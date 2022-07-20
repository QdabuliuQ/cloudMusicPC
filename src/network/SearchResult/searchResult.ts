import $http from "../http";

export function getSearchData(data: {
  keywords: string,
  limit: number,
  offset: number,
  type: number
}) {
  return $http({
    // url: '/search',
    url: '/cloudsearch',
    params: {
      ...data,
      // timestamp: Date.now(),
    }
  })
}