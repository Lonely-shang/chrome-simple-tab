// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   new Promise((resolve, reject) => {
//     if (typeof request !== 'object' || !request.type) {
//       console.error('参数异常')
//       reject(`消息 ${JSON.stringify(request)} 格式不符合规范`)
//       return
//     }
//     switch (request.type) {
//       case 'get':
//         fetch(request.url).then((res) => resolve(res))
//         break
//       case 'test':
//         resolve('11111')
//         break
//       default:
//         break
//     }
//   }).then((res) => {
//     sendResponse(res)
//   })
//   return true
// })

const themeMedia = window.matchMedia('(prefers-color-scheme: light)')
console.log(themeMedia)

themeMedia.addEventListener('change', (e) => {
  if (e.matches) {
    console.log('light')
  } else {
    console.log('dark')
  }
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { val1, val2 } = request
  sendResponse({ res: { val1, val2 } })
})

const arr: any[] = []

chrome.runtime.onConnect.addListener(function (port: any) {
  console.log('Connected .....')
  arr.push(port)
  port.onMessage.addListener(function (msg: any) {
    console.log('message recieved' + msg)
    arr.forEach((item) => {
      item.postMessage('dhfkjsdjafjsdf')
    })
    // port.postMessage('Hi Popup.js')
  })
})

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
// 	// 不能使用这种方式 使用下面tabs的方式，详见最下面常见问题
//         // chrome.runtime.sendMessage({number: request.number + 1}, (response) => {
// 	// 	console.log(
// 	// 		`background -> content script infos have been received. number: ${response.number}`
// 	// 	);
// 	// });

// 	chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
// 		chrome.tabs.sendMessage(tabs[0].id,{number: request.number + 1},(response) => {
// 				console.log(
// 					`background -> content script infos have been received. number: ${response.number}`
// 				);
// 		});
// 	});
//   // 消息回传
// 	sendResponse({number: request.number});
// });

console.log(1111)

function toPopup() {
  console.log('toPopup')
}
