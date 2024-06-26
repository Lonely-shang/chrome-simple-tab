import { initData } from '@/config'
;(async function () {
  const res = (await chrome.storage.sync.get([
    'urlConfList',
    'customerWindow'
  ])) as ChromeStorageData
  const urlConfList = res.urlConfList || []
  if (urlConfList.length == 0) {
    await chrome.storage.sync.set({
      urlConfList: initData
    })
  }
  if (!res.customerWindow) {
    await chrome.storage.sync.set({
      customerWindow: {
        urlInputStr: '',
        isEnable: false
      }
    })
  }
})()

const portMap = new Map()

chrome.runtime.onConnect.addListener((port: any) => {
  portMap.set(port.name, port)
  port.onMessage.addListener(function (msg: any) {
    portMap.forEach((item) => {
      try {
        item.postMessage(msg)
      } catch (error) {
        portMap.delete(item)
      }
    })
  })
})
