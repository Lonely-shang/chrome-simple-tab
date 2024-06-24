import { computed, defineComponent, onMounted, ref, Transition } from 'vue'
import './tab.scss'
import {
  getBingImg,
  handlerNetWorkUrl,
  handlerSearchEngines,
  handlerSearchValueShowPreFix,
  matchUrl
} from '@/utils/utils'
import { changeTheme } from '@/utils/theme'

export default defineComponent({
  name: 'App',
  setup() {
    let index: number = 0
    const searchInput = ref<HTMLInputElement>()
    const imgUrl = ref<string>('')

    const showPreFix = ref<boolean>(false)
    const preFixContent = ref<string>('')
    const searchValue = ref<string>('')

    changeTheme()

    getBingImg().then((res) => (imgUrl.value = res))

    handlerSearchValueShowPreFix(searchValue, showPreFix, preFixContent)

    // chrome.history.search(
    //   {
    //     text: ''
    //   },
    //   (results) => {
    //     console.log(results)
    //   }
    // )
    // const dateTime = new Date()
    // const port = chrome.runtime.connect({
    //   name: `Tab${dateTime.getTime()}`
    // })

    // port.onMessage.addListener(() => {
    //   changeTheme()
    // })

    const handlerKeyDown = (event: KeyboardEvent) => {
      if (event.key == 'Tab') {
        event.preventDefault()
      }

      if (event.key === 'Enter') {
        searchValue.value = searchValue.value.trim()
        if (searchValue.value == '') return
        if (matchUrl(searchValue.value)) {
          const openUrl = handlerNetWorkUrl(searchValue.value)
          window.open(openUrl)
          return
        }
        if (showPreFix.value) {
          const url = handlerSearchEngines(preFixContent.value, searchValue.value)
          window.open(url)
          return
        }
        window.open(`http://www.google.com/search?q=${searchValue.value}`)
      }

      if (searchValue.value === '' && event.key === 'Backspace') {
        if (index === 1) {
          index = 0
          showPreFix.value = false
        } else {
          index = 1
          const time = setTimeout(() => {
            index = 0
            clearTimeout(time)
          }, 300)
        }
      }
    }

    const placeholderVal = computed(() =>
      showPreFix.value ? '请输入搜索内容' : '在Google中搜索 或输入网址'
    )

    return () => (
      <div class="tabMain" style={{ 'background-image': `url(${imgUrl.value})` }}>
        <div class="title">Simple</div>
        <div class="search">
          <div v-show={showPreFix.value} class="prefix">
            {preFixContent.value}
          </div>
          <input
            type="text"
            ref={searchInput}
            v-model={searchValue.value}
            onKeydown={handlerKeyDown.bind(this)}
            placeholder={placeholderVal.value}
          />
        </div>
      </div>
    )
  }
})
