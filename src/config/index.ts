const initData: NetWorkSearchItem[] = [
  {
    keyword: 'wiki',
    title: 'Wikipedia',
    url: 'https://en.wikipedia.org/wiki/Special:Search/{query}'
  },
  {
    keyword: 'bing',
    title: 'Bing',
    url: 'http://www.bing.com/search?q={query}'
  },
  {
    keyword: 'baidu',
    title: '百度搜索',
    url: 'http://www.baidu.com/s?wd={query}'
  },
  {
    keyword: 'google',
    title: 'Google',
    url: 'http://www.google.com/search?q={query}'
  },
  {
    keyword: 'stack',
    title: 'Stack Overflow',
    url: 'https://www.google.com/search?q=site%3Astackoverflow.com%20{query}'
  },
  {
    keyword: 'maps',
    title: 'Google Maps',
    url: 'http://maps.google.com/?q={query}'
  },
  {
    keyword: 'map',
    title: 'Baidu Map',
    url: 'https://map.baidu.com/search?querytype=s&da_src=shareurl&wd={query}'
  },
  {
    keyword: 'youtube',
    title: 'Youtobe',
    url: 'https://www.youtube.com/results?search_query={query}'
  },
  {
    keyword: 'bilibili',
    title: 'BiliBili',
    url: 'https://search.bilibili.com/all?keyword={query}'
  },
  {
    keyword: 'juejin',
    title: '稀土掘金',
    url: 'https://juejin.cn/search?query={query}'
  }
]

export { initData }
