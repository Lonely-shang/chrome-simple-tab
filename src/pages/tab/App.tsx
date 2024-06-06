import { computed, ref } from 'vue'
import './tab.scss'
import logo from '@/assets/google_logo.svg'
import {
  getBingImg,
  handlerNetWorkUrl,
  handlerSearchEngines,
  handlerSearchValueShowPreFix,
  matchUrl
} from '@/utils/utils'

const imgUrl = ref<string>('')

const showPreFix = ref<boolean>(false)
const preFixContent = ref<string>('')
const searchValue = ref<string>('')

imgUrl.value = await getBingImg()

handlerSearchValueShowPreFix(searchValue, showPreFix, preFixContent)

const handlerKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    if (searchValue.value == '') return
    if (matchUrl(searchValue.value)) {
      const openUrl = handlerNetWorkUrl(searchValue.value)
      window.open(openUrl)
      return
    }
    if (showPreFix.value) {
      const url = handlerSearchEngines(preFixContent.value, searchValue.value)
      window.open(url)
    }
    window.open(`http://www.google.com/search?q=${searchValue.value}`)
  }

  if (searchValue.value === '' && event.key === 'Backspace') {
    showPreFix.value = false
  }
}

const placeholderVal = computed(() =>
  showPreFix.value ? '请输入搜索内容' : '在Google中搜索 或输入网址'
)

// const themeMedia = window.matchMedia('(prefers-color-scheme: light)')
// console.log(themeMedia)

// themeMedia.addEventListener('change', (e) => {
//   if (e.matches) {
//     console.log('light')
//   } else {
//     console.log('dark')
//   }
// })

const App = () => {
  return (
    <div class="tabMain" style={{ 'background-image': `url(${imgUrl.value})` }}>
      <div class="title">
        <img src={logo} alt="" srcset="" />
      </div>
      <div class="search">
        <div v-show={showPreFix.value} class="prefix">
          {preFixContent.value}
        </div>
        <input
          type="text"
          v-model={searchValue.value}
          onKeydown={handlerKeyDown.bind(this)}
          placeholder={placeholderVal.value}
        />
      </div>
    </div>
  )
}

export default App
