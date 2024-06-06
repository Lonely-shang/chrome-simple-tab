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
    title: '百 度',
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
  }
]

export { initData }
