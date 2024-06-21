import { watch, type Ref } from 'vue'
import { initData } from '@/config'
import FetchService from '@/plugins/FetchService'
import { getBingEnvUrl } from './env'

export const getBingImg = async (): Promise<string> => {
  return new FetchService()
    .get(`${getBingEnvUrl()}/HPImageArchive.aspx?format=js&idx=0&n=1`)
    .then((res: any) => {
      return `https://cn.bing.com/${res.images[0].url}`
    })
}

const handlerInitData = (arr: NetWorkSearchItem[]): NetWorkSearchObj => {
  const obj: NetWorkSearchObj = {}
  arr.forEach((res) => {
    obj[res.keyword] = res
  })
  return obj
}

export const handlerSearchValueShowPreFix = (
  searchVal: Ref<string>,
  showPreFix: Ref<boolean>,
  preFixContent: Ref<string>
) => {
  watch(searchVal, (newVal) => {
    if (showPreFix.value) return
    const regVal = newVal.match(/(\S*) /)
    if (!regVal) return
    const matchVal = regVal[0].trim()
    const obj: NetWorkSearchObj = handlerInitData(initData)
    const item = obj[matchVal]
    if (item != undefined) {
      showPreFix.value = true
      preFixContent.value = item.title
      searchVal.value = searchVal.value.replace(regVal[0], '')
    }
  })
}

export const handlerSearchEngines = (enginesName: string, searchVal: string): string => {
  const netWorkSearchItem = initData.find((item) => item.title === enginesName)
  return netWorkSearchItem!.url.replace('{query}', searchVal)
}

export const matchUrl = (searchVal: string): boolean => {
  // eslint-disable-next-line no-useless-escape
  // const reg = /^((https|http|ftp)\:\/\/)?[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}(:[0-9]{1,5})?(\/[\S]*)?$/
  // eslint-disable-next-line no-useless-escape
  const reg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/
  return reg.test(searchVal)
}

export const handlerNetWorkUrl = (searchVal: string) => {
  const _copySearchValue = searchVal.trim()
  // const reg = /^(https|http|ftp)?:?\/\//
  const reg = /(\S*)\/\//
  const matchVal = _copySearchValue.match(reg)
  if (!matchVal) return `http://${_copySearchValue}`
  const replaceVal = matchVal[0]
  if (replaceVal.indexOf('http') != -1 || replaceVal.indexOf('https') != -1) {
    return _copySearchValue
  }
  return _copySearchValue.replace(replaceVal, 'http://')
}
