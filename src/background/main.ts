chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  new Promise((resolve, reject) => {
    if (typeof request !== 'object' || !request.type) {
      console.error('参数异常')
      reject(`消息 ${JSON.stringify(request)} 格式不符合规范`)
      return
    }
    switch (request.type) {
      case 'get':
        fetch(request.url).then((res) => resolve(res))
        break
      case 'test':
        resolve('11111')
        break
      default:
        break
    }
  }).then((res) => {
    sendResponse(res)
  })
  return true
})
