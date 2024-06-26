interface NetWorkSearchItem {
  keyword: string
  title: string
  url: string
}

interface NetWorkSearchObj {
  [key: string]: NetWorkSearchItem
}

interface ChromeStorageData {
  exterior: number
  urlConfList?: NetWorkSearchItem[]
  customerWindow?: {
    urlInputStr: string
    isEnable: boolean
  }
}
