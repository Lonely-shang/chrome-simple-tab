// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   // 可写成switch形式 监听所有
//   if (sender === '') {
//     // do something
//   }
//   if (request.from === 'cc') {
//     // from 不是固定词，可使用其他自定义词汇
//     // do something
//   }
//   // 发送回传
//   sendResponse({ number: request.number })

//   // 修改dom

//   // 重发信息
//   chrome.runtime.sendMessage({ number: request.number + 1 }, (response) => {
//     console.log(`content script -> background infos have been received. number: ${response.number}`)
//   })
// })
