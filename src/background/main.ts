const portMap = new Map()

chrome.runtime.onConnect.addListener((port: any) => {
  portMap.set(port.name, port)
  port.onMessage.addListener(function (msg: any) {
    console.log(portMap)
    portMap.forEach((item) => {
      item.postMessage(msg)
    })
  })
})
