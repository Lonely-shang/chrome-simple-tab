import { ref } from 'vue'
import './tab.scss'
import logo from '@/assets/google_logo.svg'
import FetchService from '@/plugins/FetchService'

const url1 = ref<string>('')

new FetchService().get('/bing/HPImageArchive.aspx?format=js&idx=0&n=1').then((res: any) => {
  url1.value = `https://cn.bing.com/${res.images[0].url}`
  console.log(res)
})

const searchValue = ref<string>('')

const handlerSearchValChange = (event: Event) => {
  searchValue.value = (event as InputEvent).data || ''
}

const handlerKeyDown = (event: KeyboardEvent) => {
  console.log(event)
  if (event.key === 'Enter') {
    window.open(`http://www.bing.com/search?q=${searchValue.value}`)
  }
}

const App = () => {
  return (
    <div class="tabMain" style={{ 'background-image': `url(${url1.value})` }}>
      <div class="title">
        <img src={logo} alt="" srcset="" />
      </div>
      <div class="search">
        <input
          type="text"
          value={searchValue.value}
          onInput={handlerSearchValChange}
          onKeydown={handlerKeyDown.bind(this)}
          placeholder="Google中搜索 或输入网址"
        />
      </div>
    </div>
  )
}

export default App
